/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProcessSteps({process, currentID}) {
  
    const [currentIndex, setCurrentIndex] = useState('')

    useEffect(() => {
        console.log(process)
        process.forEach((element, index) => {
            if(element._id === currentID) {
                setCurrentIndex(index)
            }
        });
    }, [process])

    useEffect(() => {
      console.log(process);
    }, [])

  return (
    <nav aria-label="Progress" className='ml-5'>
      
      <ol className="overflow-hidden">
        {process?.map((step, stepIdx) => (
          <li key={step._id} className={classNames(stepIdx !== process.length - 1 ? 'pb-10' : '', 'relative')}>
            {stepIdx < currentIndex ? (
              <>
                {stepIdx !== process.length - 1 ? (
                  <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-indigo-600" aria-hidden="true" />
                ) : null}
                <a href={step.href} className="relative flex items-center group">
                  <span className="h-9 flex items-center">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                      <CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase">{step.process_title}</span>
                    <span className="text-sm text-gray-500">{step.description}</span>
                  </span>
                </a>
              </>
            ) : step._id === currentID ? (
              <>
                {stepIdx !== process.length - 1 ? (
                  <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300" aria-hidden="true" />
                ) : null}
                <div className="relative flex items-center group" aria-current="step">
                  <span className="h-9 flex items-center" aria-hidden="true">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full">
                      <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase text-indigo-600">{step.process_title}</span>
                    <span className={`text-sm text-gray-500`}>Kurbanınız Şuanda Bu Aşamada</span>
                  </span>
                </div>
              </>
            ) : (
              <>
                {stepIdx !== process.length - 1 ? (
                  <div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300" aria-hidden="true" />
                ) : null}
                <div className="relative flex items-center group">
                  <span className="h-9 flex items-start" aria-hidden="true">
                    <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                      <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                    </span>
                  </span>
                  <span className="ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase text-gray-500">{step.process_title}</span>
                  </span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
   
    </nav>
  )
}
