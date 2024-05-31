import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';

export const Footer = () => {
    const links = [
        {
            href: 'mailto:wagerwheel@gmail.com',
            icon: <EmailIcon className='h-8 w-8'/>
        },
        {
            href: 'githublink',
            icon: <GitHubIcon className='h-8 w-8'/>
        }
    ]
    return (
        <div className='text-center pb-8'>
            <div className='flex items-center justify-center space-x-4'>
                <h2>Social | </h2>
                {links.map((link, index) => (
                    <Link href={link.href} key={index} className='hover:opacity-45 transition duration-300'>
                        {link.icon}
                    </Link>
                
                ))}
                
            </div>
            <p className='text-sm text-slate-100/50'>© 2024 Wagerwheel | All rights reserved.</p>
        </div>
    )
}