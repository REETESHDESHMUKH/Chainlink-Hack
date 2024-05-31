"use client"
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navigation = [
  { id: 0,name: 'Rock Scissor', icon: "/rock-paper-scissors.png", href: '/games/rock-scissor'},
  { id: 1,name: 'Spin the wheel', icon: "/spinWheel.png", href: '/games/spin-wheel'},
  { id: 2,name: 'Mines', icon: "/bomb.png", href: '/games/mines'},
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const [current,setCurrent] = useState<number>(0);
  const pathname = usePathname();
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-2 flex-1 px-2 bg-gray-800 space-y-1" aria-label="Sidebar">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
              )}
              onClick={()=>setCurrent(item.id)}
            >
              <img className={classNames(
                   pathname === item.href ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                  'mr-3 flex-shrink-0 h-6 w-6'
                )} src={item.icon} alt="image description">
              </img>
              <span className="flex-1">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
