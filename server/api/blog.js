import Blog from '../model/Blog.js';


export const createBlog = async (req, res) => {
    const newBlog = new Blog(req.body);
    try {
        const createdBlog = await newBlog.save();
        res.status(200).json(createdBlog)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json("Blog Deleted");
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllBlog = async (req, res) => {
    try {
        const blogDetails = await Blog.find();
        res.status(200).send(blogDetails);
    } catch (error) {
        res.status(500).json(error);
    }
}