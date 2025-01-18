import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mb-4 mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/terms">Terms</Link>
          <div>·</div>
          <Link href="/transparency">Transparency</Link>
          <div>·</div>
          <Link href="/privacy">Privacy</Link>
          <div>·</div>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="space-x-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Utanzu Cybersecurity Community is a non-profit organization. All rights reserved.
        </div>
        <div className="mb-2 flex space-x-2 text-xs text-gray-500 dark:text-gray-400"></div>
        <div className="space-x-4 text-center text-xs text-gray-500 dark:text-gray-400">
          {`© ${new Date().getFullYear()} ${siteMetadata.author}`}
        </div>
      </div>
    </footer>
  )
}
