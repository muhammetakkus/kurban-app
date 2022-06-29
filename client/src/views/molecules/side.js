/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { PlusSmIcon, BadgeCheckIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import { ChatIcon } from '@heroicons/react/outline'

export default function Side(props) {
  const {
    data,
    result,
    kurbanProcess
  } = props;

  useEffect(() => {
    setOpen(data.isOpen)
  }, [data])
  
  const [open, setOpen] = useState(data.isOpen)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[998]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-96">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="h-full overflow-y-auto bg-white p-8">
                    <div className="space-y-6 pb-16">
                      <div>
                        <h3 className="font-medium lg:text-2xl text-gray-900">{data.title}</h3>
                        <span className={`${data.kurban_no ? "" : "hidden"} text-xs`}>{data.kurban_no} No'lu kurbanın hissedarlarına SMS göder</span>
                        <ul className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                          {data.veri?.map(item => (
                            <li className="flex items-center justify-between py-2" key={item._id} onClick={() => data.title !== 'Mesajlar' ? result(item) : null} >
                            <button
                              type="button"
                              className="w-full group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <span className={`${item._id === data.state_loading ? "animate-bounce !text-green-400" : ""} flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400`}>
                                <PlusSmIcon className={`h-5 w-5  ${kurbanProcess?.process_title === item.process_title ? "hidden" : ""}`} aria-hidden="true" />
                                <BadgeCheckIcon className={`h-5 w-5 text-green-500 ${item.message_title ? 'hidden' : ''} ${kurbanProcess?.process_title === item.process_title ? "" : "hidden"}`} aria-hidden="true" />
                                <ChatIcon className={`${item.message_title ? '' : 'hidden'} w-5 h-5`} />
                              </span>
                              <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                                {item.process_title ? item.process_title : item.message_title}
                              </span>
                            </button>
                              <span 
                              onClick={() => result(item)}
                              className={`text-sm cursor-pointer ${item.message_title ? "" : "hidden"} px-1.5 lg:px-2.5 py-1  lg:py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100`}>GÖNDER</span>
                          </li>
                          ))}

                          <li className={`${(data.title !== 'Mesajlar' && data.veri?.length === 0) ? "" : "hidden"} text-center text-gray-400`}>Henüz işlem adımı oluşturmadınız..</li>
                          
                          {/* SEND kurban-info MESSAGE */}
                          <li className={`flex items-center justify-between py-2 !border-dashed border-purple-700 ${data.title === 'Mesajlar' ? "" : "hidden"}`} >
                            <button
                              type="button"
                              className="w-full group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <span className={`${data.kurban_info_message ? "animate-bounce !text-green-400" : ""} flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400`}>
                                <ChatIcon className={`w-5 h-5`} />
                              </span>
                              <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                                Kurban Bilgi Link Mesajı
                              </span>
                            </button>
                              <span 
                              onClick={() => result({kurban_info_message: 1})}
                              className={`text-sm cursor-pointer px-1.5 lg:px-2.5 py-1  lg:py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100`}>GÖNDER</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
