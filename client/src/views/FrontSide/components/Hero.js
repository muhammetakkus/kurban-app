import { NavLink } from "react-router-dom"

function Hero () {
    return (
        <div class="relative">
        <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div class="absolute inset-0">
              <img class="h-full w-full object-cover" src="https://i4.hurimg.com/i/hurriyet/75/0x0/6233107067b0a927c8adab1d.webp" alt="People working on laptops" />
              <div class="absolute inset-0 bg-gradient-to-r from-orange-400 to-indigo-800 mix-blend-multiply"></div>
            </div>
            <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span class="block text-white">Bu Bayram Kurbanlıklarınız Burada</span>
                <span class="block text-indigo-200 text-4xl">Online Kurban Satış ve Kurban Takip Otomasyonu</span>
              </h1>
              <p class="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                Baştan sona kurban hizmeti. Kurban takip sistemi ve online satış.
              </p>
              <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <NavLink to={'/'}
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 sm:px-8"
                  >Satıştaki Kurbanlıklar</NavLink>
                  <NavLink to={'/'}
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                  >Sepet</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Hero