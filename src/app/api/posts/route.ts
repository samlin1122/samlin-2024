import { NextResponse } from "next/server";
import mongoDBConnect from "@/libs/mongoDB";
import Post from "@/models/post";

// const url = "https://jsonplaceholder.typicode.com/posts";

export const GET = async () => {
  try {
    await mongoDBConnect();
    const allPost = await Post.find();
    return NextResponse.json(allPost);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};

export const POST = async (req: Request) => {
  try {
    const { title, description } = await req.json();
    const newPost = { title, description };
    await mongoDBConnect();
    const data = await Post.create(newPost);
    return NextResponse.json({ message: "success", data });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
  // export const POST = async (req: Request, res: NextApiResponse) => {
  //   const schma = object({
  //     userId: string().required(),
  //     title: string().required(),
  //     body: string().optional(),
  //   });

  //   try {
  //     const { userId, title, body } = await schma.validate(await req.json());
  //     console.log({ userId, title, body });

  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //       body: JSON.stringify({
  //         userId,
  //         title,
  //         body,
  //       }),
  //     });

  //     const data = await response.json();
  //     return NextResponse.json(data);
  //   } catch (error) {
  //     return NextResponse.json(
  //       {
  //         message: (error as Error).message,
  //       },
  //       { status: 400 }
  //     );
  //   }

  // try {
  //   let aaa = await inputSchema.validate(req.body);
  //   console.log({ aaa }, req.body);
  // } catch (error) {
  //   console.log(222);

  //   NextResponse.json({
  //     message: (error as Error).message,
  //     result: null,
  //   });
  // }
  // console.log(111);

  // try {
  //   const { userId, title, body } = inputSchema.cast(req.body);
  //   console.log({ userId, title, body });

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //     body: JSON.stringify({
  //       userId,
  //       title,
  //       body,
  //     }),
  //   });

  //   const data = await response.json();
  //   return NextResponse.json(data);
  // } catch (error) {
  //   NextResponse.json({
  //     message: (error as Error).message,
  //     result: null,
  //   });
  // }
};
