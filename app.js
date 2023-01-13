const express = require('express');
const app = express();
const PORT = 4444;
const hbs = require('hbs');
const path = require('path');

const methodOverride = require('method-override');
const { parse } = require('path');
 
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname,'static')));
app.set('view engine','hbs');
app.use(express.urlencoded({extended: true}));

hbs.registerPartials(__dirname + '/views/partials');
let num = 4;
let blogs = [
    {
        id: 1,
        username: 'Abhinav',
        blogContent: "The tree data structure is one of the most important and, at the same time, most feared data structures for coding interviews at product-based companies like Amazon, Google, Walmart, and Microsoft. Its extensive applications in software development justify the importance of tree data structureFor example the autocomplete feature in text editors is possible due to tree data structure Whenever we search for something on Google we get results within a fraction of a second, this is possible due to tree data structureBut as a beginner, it is complicated to decide where to begin and what to study. There are so many types of trees like AVL, Binary Tree, B-tree, N-tree Red-Black Tree, and many more that it may be impossible to study all these types"
    },
    {
        id: 2,
        username: 'Yash',
        blogContent: `Linked List: Definition. A linked list is a dynamic data structure where each element (called a node) is made up of two items: the data and a reference (or pointer), which points to the next node. A linked list is a collection of nodes where each node is connected to the next node through a pointer.`
    },
    {
        id: 3,
        username: 'Bhawansh Baleja',
        blogContent: `Stacks are a type of container adaptors with LIFO(Last In First Out) type of working, where a new element is added at one end (top) and an element is removed from that end only.  Stack uses an encapsulated object of either vector or deque (by default) or list (sequential container class) as its underlying container, providing a specific set of member functions to access its elements. 

        If there is confusion in remembering the basic difference between stack and queue, then just have a real life example for this differentiation, for stack, stacking of books we can take the top book easily and for queue remember when you have to stand in queue front of ATM for taking out the cash, then first person near to ATM has the first chance to take out the money from ATM. So, queue is the FIFO (First In First Out) type working.`
    }
]

// GET ALL THE BLOGS
app.get('/blogs',(req,res)=>{
    res.render('blogs',{
        blogs: blogs,
        blogsPresent: blogs.length>0
    });
})

// CREATE NEW BLOG PAGE
app.get('/blogs/new',(req,res)=>{
    res.render('newBlog');
})

// ADDING A NEW BLOG
app.post('/blogs',(req,res)=>{
    const {username, blogContent} = req.body;
    blogs.push({
        id:num,
        username,
        blogContent
    })
    num++;
    res.redirect('/blogs');
})

// SHOW A SINGLE BLOG TO USER
app.get('/blogs/:id',(req,res)=>{
    const {id} = req.params;

    const myBlog = blogs.filter((blog)=>blog.id === parseInt(id));
    // console.log(myBlog[0]);
    res.render('singleBlog',myBlog[0]);
})
app.get('/contact',(req,res)=>{
  
    res.render('contact');
})
app.get('/team',(req,res)=>{
  
    res.render('team');
})

// EDIT A SINGLE BLOG
app.get('/blogs/:id/edit',(req,res)=>{
    const {id} = req.params;
    const myBlog = blogs.filter((blog)=>parseInt(id) === blog.id);
    res.render('editBlog',myBlog[0]);
})

//  Update a particular blog
app.put('/blogs/:id',(req,res)=>{
    const {id} = req.params;
    let myBlogIndex;
    blogs.map((blog,indx)=>{
        if(blog.id == parseInt(id)){
            myBlogIndex = indx;
        }
    })
    const {username,blogContent} = req.body;
    // console.log(username,blogContent);
    blogs[myBlogIndex].username = username;
    blogs[myBlogIndex].blogContent = blogContent;

    res.redirect('/blogs');
})

// DELETE A BLOG
app.delete('/blogs/:id',(req,res)=>{
    const {id} = req.params;
    const newBlogs = blogs.filter((blog)=>blog.id!==parseInt(id));
    blogs =  newBlogs;
    res.redirect('/blogs');
})

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})