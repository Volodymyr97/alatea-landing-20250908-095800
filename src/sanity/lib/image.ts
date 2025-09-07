import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client"; // ваш sanity client

const builder = imageUrlBuilder(client);
export const urlFor = (src: any) => builder.image(src);
