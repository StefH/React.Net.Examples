using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.UI;
using ReactMvcSample.ViewModels;

namespace ReactMvcSample.Controllers;

public class HomeController : Controller
{
    private const int COMMENTS_PER_PAGE = 3;

    private readonly IDictionary<string, AuthorModel> _authors;
    private readonly IList<CommentModel> _comments;

    public HomeController()
    {
        // In reality, you would use a repository or something for fetching data
        // For clarity, we'll just use a hard-coded list.
        _authors = new Dictionary<string, AuthorModel>
        {
            {"daniel", new AuthorModel { Name = "Daniel Lo Nigro", GithubUsername = "Daniel15" }},
            {"vjeux", new AuthorModel { Name = "Christopher Chedeau", GithubUsername = "vjeux" }},
            {"cpojer", new AuthorModel { Name = "Christoph Pojer", GithubUsername = "cpojer" }},
            {"jordwalke", new AuthorModel { Name = "Jordan Walke", GithubUsername = "jordwalke" }},
            {"zpao", new AuthorModel { Name = "Paul O'Shannessy", GithubUsername = "zpao" }},
        };
        _comments = new List<CommentModel>
        {
            new CommentModel { Author = _authors["daniel"], Text = "First!!!!111!" },
            new CommentModel { Author = _authors["zpao"], Text = "React is awesome!" },
            new CommentModel { Author = _authors["cpojer"], Text = "Awesome!" },
            new CommentModel { Author = _authors["vjeux"], Text = "Hello World" },
            new CommentModel { Author = _authors["daniel"], Text = "Foo" },
            new CommentModel { Author = _authors["daniel"], Text = "Bar" },
            new CommentModel { Author = _authors["daniel"], Text = "FooBarBaz" },
        };
    }

    public ActionResult Index()
    {
        return View(new IndexViewModel
        {
            Comments = _comments.Take(COMMENTS_PER_PAGE),
            CommentsPerPage = COMMENTS_PER_PAGE,
            Page = 1,
            Name = "stef"
        });
    }

    [OutputCache(Duration = 0, Location = OutputCacheLocation.Any, VaryByHeader = "Content-Type")]
    public ActionResult Comments(int page, string text)
    {
        Response.Cache.SetOmitVaryStar(true);
        var comments = _comments.Skip((page - 1) * COMMENTS_PER_PAGE).Take(COMMENTS_PER_PAGE);
        var hasMore = page * COMMENTS_PER_PAGE < _comments.Count;

        if (ControllerContext.HttpContext.Request.ContentType == "application/json" || ControllerContext.HttpContext.Request.AcceptTypes?.Contains("application/json") == true)
        {
            return Json(new
            {
                comments = comments,
                text = text,
                hasMore = hasMore
            }, JsonRequestBehavior.AllowGet);
        }
        else
        {
            return View("Index", new IndexViewModel
            {
                Comments = _comments.Take(COMMENTS_PER_PAGE * page),
                CommentsPerPage = COMMENTS_PER_PAGE,
                Page = page
            });
        }
    }

    public ActionResult About()
    {
        ViewBag.Message = "Your application description page.";

        return View();
    }

    public ActionResult Contact()
    {
        ViewBag.Message = "Your contact page.";

        return View();
    }
}