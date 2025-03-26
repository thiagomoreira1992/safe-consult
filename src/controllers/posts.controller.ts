
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

interface Post {
  title: string,
  content: string,
  safeness: string
}

export default class PostsController {
  async create(req: Request, res: Response) {
    try {
      const newPost = <Post>req.body;
      const post = await prisma.post.create({
        data: {
          title: newPost.title,
          content: newPost.content,
          safeness: newPost.safeness
        }
      })
      console.log(post)
      res.status(201).json({
        message: "create OK"
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const posts = await prisma.post.findMany({})
      res.status(200).json({
        posts
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  // async findOne(req: Request, res: Response) {
  //   try {
  //     res.status(200).json({
  //       message: "findOne OK",
  //       reqParamId: req.params.id
  //     });
  //   } catch (err) {
  //     res.status(500).json({
  //       message: "Internal Server Error!"
  //     });
  //   }
  // }

  async update(req: Request, res: Response) {
    try {
      let updatePost;

      const postID = parseInt(req.params.id)
      const newPost = <Post>req.body;

      if (postID) {
        updatePost = await prisma.post.update({
          where:{
            id: postID
          },
          data:{
            title: newPost.title,
            content: newPost.content,
            safeness: newPost.safeness
          }
        })
      }
      res.status(200).json({
        message: "update OK",
        reqParamId: req.params.id,
        reqBody: req.body
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      let deletePost;
      const postID = parseInt(req.params.id)
      const post = await prisma.post.findUnique({ where: { id: postID } })

      console.log(post)
      if (post) {
        deletePost = await prisma.post.delete({ where: { id: postID } })
      }
      res.status(200).json({
        message: deletePost,
        reqParamId: req.params.id
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }
}