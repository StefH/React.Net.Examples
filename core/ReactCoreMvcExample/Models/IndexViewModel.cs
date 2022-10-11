namespace ReactCoreMvcExample.Models;

public class IndexViewModel
{
    public IEnumerable<CommentModel> Comments { get; set; }
    public int CommentsPerPage { get; set; }
    public int Page { get; set; }

    public string Name { get; set; }
}

public class AuthorModel
{
    public string Name { get; set; }
    public string GithubUsername { get; set; }
}

public class CommentModel
{
    public AuthorModel Author { get; set; }
    public string Text { get; set; }
}