import Hero from '../components/Hero'
const products = [
  {
    id: 1,
    name: 'Büyükbaş Hisse 1/7',
    color: '40-35 KG Et',
    href: '#',
    imageSrc: 'https://i.internethaber.com/2/1280/800/storage/files/images/2020/07/01/kurbanlik-fYLw_cover.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  {
    id: 2,
    name: 'Büyükbaş Hisse 1/7',
    color: '40-35 KG Et',
    href: '#',
    imageSrc: 'https://cdnuploads.aa.com.tr/uploads/Contents/2019/08/02/thumbs_b_c_e017344a3e48013d089e0597c05b5214.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  {
    id: 3,
    name: 'Büyükbaş Hisse 1/7',
    color: '40-35 KG Et',
    href: '#',
    imageSrc: 'https://i.internethaber.com/2/1280/800/storage/files/images/2020/07/01/kurbanlik-fYLw_cover.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  {
    id: 4,
    name: 'Büyükbaş Hisse 1/7',
    color: '40-35 KG Et',
    href: '#',
    imageSrc: 'https://cdnuploads.aa.com.tr/uploads/Contents/2019/08/02/thumbs_b_c_e017344a3e48013d089e0597c05b5214.jpg',
    imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
    price: '$140',
  },
  // More products...
]

export default function Home() {

    return (
      <div className="home-wrapper">

      <Hero />

      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Satıştaki Kurbanlıklar</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <div className="relative">
                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">{product.price}</p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={product.href}
                  className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Satın Al
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    )
  }