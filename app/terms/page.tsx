import Image from 'next/image'
import { genPageMetadata } from 'app/seo'
import { Link } from '@/components/ui/link'

export const metadata = genPageMetadata({ title: 'Terms of Use' })
const TermsPage = () => {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Terms of Use
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-row items-center justify-center space-x-2 pt-8 xl:flex-col">
            <div className="pr-8 xl:pr-0">
              <Image
                src="/static/images/avatar.png"
                alt="avatar"
                width={192}
                height={192}
                className="h-30 w-30 rounded-full p-5"
              />
            </div>
            <div>
              <h3 className="pb-2 pt-4 text-3xl font-bold leading-8 tracking-tight xl:text-2xl">
                Utanzu Community
              </h3>
              <div className="text-lg text-gray-500 dark:text-gray-400 xl:text-base">
                Join, Learn & Thrive
              </div>
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-dark xl:col-span-2">
            <h3>Introduction</h3>
            <p>
              Welcome to our website. By accessing or using our website, you agree to be bound by
              these Terms of Use. Please read them carefully before using our services.
            </p>

            <h3>Use of the Website</h3>
            <p>
              You agree to use this website only for lawful purposes and in a manner that does not
              infringe the rights of or restrict or inhibit anyone else's use and enjoyment of the
              website.
            </p>

            <h3>Intellectual Property</h3>
            <p>
              All content included on this website, including text, graphics, logos, images, and
              software, is the property of the website owner or its licensors and is protected by
              international copyright laws.
            </p>

            <h3>User Obligations</h3>
            <p>
              You agree to provide accurate, current, and complete information when creating an
              account or interacting with the website. You are responsible for maintaining the
              confidentiality of your account and password.
            </p>

            <h3>Limitation of Liability</h3>
            <p>
              Our website is provided "as is" and we make no warranties regarding its use. In no
              event will we be liable for any direct, indirect, incidental, special, or
              consequential damages arising out of the use or inability to use this website.
            </p>

            <h3>Changes to the Terms</h3>
            <p>
              We reserve the right to modify these Terms of Use at any time without prior notice.
              Your continued use of the website after any changes constitutes your acceptance of the
              new Terms.
            </p>

            <h3>Governing Law</h3>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Kenya.
              Any disputes arising under these Terms will be subject to the exclusive jurisdiction
              of the courts located in Kenya.
            </p>

            <h3>Contact Us</h3>
            <p>
              If you have any questions about these Terms, please contact us at{' '}
              <Link href="mailto:support@utanzu.com">support@utanzu.com</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermsPage
