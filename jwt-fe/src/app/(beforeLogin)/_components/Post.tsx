import { PostType } from "@/types/PostType";
import style from "./post.module.scss";
import Image from "next/image";

type Props = {
  data: PostType;
};

export default function Post({ data }: Props) {
  return (
    <li className={style.post}>
      <div className={style.imgWrapper}>
        <Image src={data.img} alt={`${data.img}.img`} fill />
      </div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
    </li>
  );
}
