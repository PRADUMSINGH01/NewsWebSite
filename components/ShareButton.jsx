import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

export default function ShareButtons({ slug, title }) {
  const shareUrl = `https://hmarduniya.in/Read-full-news/${slug}`;

  return (
    <div className="flex items-center gap-3 mt-6">
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={36} round />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={36} round />
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={36} round />
      </WhatsappShareButton>

      <LinkedinShareButton url={shareUrl} title={title}>
        <LinkedinIcon size={36} round />
      </LinkedinShareButton>
    </div>
  );
}
