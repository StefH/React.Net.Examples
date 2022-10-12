using Microsoft.AspNetCore.Mvc;
using ReactCoreMvcExample.Models;

namespace ReactCoreMvcExample.Controllers;

public class HomeController : Controller
{
    private const int COMMENTS_PER_PAGE = 3;

    private readonly IList<CommentModel> _comments;

    public HomeController()
    {
        // In reality, you would use a repository or something for fetching data
        // For clarity, we'll just use a hard-coded list.
        var authors = new Dictionary<string, AuthorModel>
        {
            {"daniel", new AuthorModel { Name = "Daniel Lo Nigro", GithubUsername = "Daniel15" }},
            {"vjeux", new AuthorModel { Name = "Christopher Chedeau", GithubUsername = "vjeux" }},
            {"cpojer", new AuthorModel { Name = "Christoph Pojer", GithubUsername = "cpojer" }},
            {"jordwalke", new AuthorModel { Name = "Jordan Walke", GithubUsername = "jordwalke" }},
            {"zpao", new AuthorModel { Name = "Paul O'Shannessy", GithubUsername = "zpao" }}
        };
        _comments = new List<CommentModel>
        {
            new() { Author = authors["daniel"], Text = "First!!!!111!" },
            new() { Author = authors["zpao"], Text = "React is awesome!" },
            new() { Author = authors["cpojer"], Text = "Awesome!" },
            new() { Author = authors["vjeux"], Text = "Hello World" },
            new() { Author = authors["daniel"], Text = "Foo" },
            new() { Author = authors["daniel"], Text = "Bar" },
            new() { Author = authors["daniel"], Text = "FooBarBaz" }
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

    [HttpGet]
    public ActionResult Comments(int page, string text)
    {
        var comments = _comments.Skip((page - 1) * COMMENTS_PER_PAGE).Take(COMMENTS_PER_PAGE);
        var hasMore = page * COMMENTS_PER_PAGE < _comments.Count;

        if (ControllerContext.HttpContext.Request.ContentType == "application/json" ||
            ControllerContext.HttpContext.Request.Headers["Accept"].Any(headerValue => headerValue.Contains("application/json")))
        {
            return Json(new
            {
                comments = comments,
                text = text,
                hasMore = hasMore
            });
        }

        return View("Index", new IndexViewModel
        {
            Comments = _comments.Take(COMMENTS_PER_PAGE * page),
            CommentsPerPage = COMMENTS_PER_PAGE,
            Page = page
        });
    }

    public ActionResult About()
    {
        ViewBag.Message = "The about page...";

        return View();
    }
}