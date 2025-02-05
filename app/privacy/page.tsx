import Image from 'next/image'
import { genPageMetadata } from 'app/seo'
import { Link } from '@/components/ui/link'

export const metadata = genPageMetadata({ title: 'Privacy and Cookie Policy' })

const PrivacyPage = () => {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Privacy and Cookie Policy
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-row items-center justify-center space-x-2 pt-8 xl:flex-col">
            <div className="pr-8 xl:pr-0">
              <Image
                src="/static/images/avatar.png"
                alt="Utanzu Cybersecurity Avatar"
                width={192}
                height={192}
                className="h-30 w-30 rounded-full p-5"
              />
            </div>
            <div>
              <h3 className="pb-2 pt-4 text-3xl font-bold leading-8 tracking-tight xl:text-2xl">
                Utanzu Cybersecurity
              </h3>
              <div className="text-lg text-gray-500 dark:text-gray-400 xl:text-base">
                Join, Learn & Thrive
              </div>
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-dark xl:col-span-2">
            <h3>Introduction</h3>
            <p>
              Welcome to Utanzu Cybersecurity Community. Your privacy is important to us. This
              Privacy and Cookie Policy explains how we collect, use, and protect your information
              when you visit our website.
            </p>

            <h3>Data Collection</h3>
            <p>
              We collect personal information that you voluntarily provide to us, such as your name,
              email address, and CV/resume, as well as technical data like your IP address and
              browser type when you use our services.
            </p>

            <h3>Cookie Usage</h3>
            <p>
              We use cookies and similar tracking technologies to improve your browsing experience,
              analyze site traffic, and personalize content. Cookies are small data files stored on
              your device. By using our website, you agree to our use of cookies.
            </p>

            <h3>Data Use</h3>
            <p>
              The information we collect is used to provide and improve our services, personalize
              your experience, and communicate with you. We may also use your data to analyze trends
              and better understand how our users interact with our website.
            </p>

            <h3>Data Sharing</h3>
            <p>
              We do not sell your personal information. We may share your information with trusted
              third-party service providers to help us operate our website or conduct our business,
              provided you have given consent and they agree to keep your data confidential.
            </p>

            <h3>Your Rights</h3>
            <p>
              You have the right to access, update, or delete your personal information at any time.
              Please contact us if you have any questions or concerns regarding your privacy or data
              protection.
            </p>

            <h3>Security</h3>
            <p>
              We implement a variety of security measures to maintain the safety of your personal
              information. However, no method of transmission over the Internet is completely
              secure, and we cannot guarantee its absolute security.
            </p>

            <h3>Changes to This Policy</h3>
            <p>
              We reserve the right to modify this Privacy and Cookie Policy at any time. Any changes
              will be posted on this page and will take effect immediately upon publication. Your
              continued use of our website after any modifications constitutes your acceptance of
              the new policy.
            </p>

            <h3>Contact Us</h3>
            <p>
              If you have any questions or concerns about this Privacy and Cookie Policy, please
              contact us at <Link href="mailto:support@utanzu.com">support@utanzu.com</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPage
