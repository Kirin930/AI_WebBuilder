import SlugPage from "./[slug]/page";

export default function IndexPage() {
  // Your Strapi homepage should have slug = "home"
  
  return <SlugPage params={{ slug: "home" }} />;
}