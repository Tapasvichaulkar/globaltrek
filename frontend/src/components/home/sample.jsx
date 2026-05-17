"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const DATA = [
  {
    id: 1,
    title: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    thumbnail:
      "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770211743/tajmahal_soajmc.jpg",
    main360:
      "https://www.google.com/maps/embed?pb=!4v1769523828015!6m8!1m7!1sNTawNTSHgfdFNwR6X-XAqw!2m2!1d27.17419537653624!2d78.0422540567116!3f342.38!4f16.91!5f0.4",
    views: [
      "https://www.google.com/maps/embed?pb=!4v1770379541975!6m8!1m7!1s7k838kIP3_afMdK5eLR9PA!2m2!1d27.17322905661145!2d78.04081785598629!3f226.17325295592798!4f-4.75304517074305!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770379626291!6m8!1m7!1sOJgAvWVirnmYgBA3mQegiA!2m2!1d27.17298210646185!2d78.04219310151512!3f359.64791322506795!4f-19.03689120478647!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770380677308!6m8!1m7!1szm7XrxIvl-Uk34MytHSwZA!2m2!1d27.17871781494646!2d78.04199430025474!3f178.60771186839162!4f-6.4882995738445!5f0.7820865974627469"
    ],
  },
  {
    id: 2,
    title: "Qutub Minar",
    location: "Delhi",
    thumbnail:
      "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770211743/qutubminar_dlmdqz.jpg",
    main360:
      "https://www.google.com/maps/embed?pb=!4v1769524175980!6m8!1m7!1sNssODWlLi6UgxWnDOlxgDg!2m2!1d28.52484127392997!2d77.18547743485989!3f175.96!4f20.77!5f0.78",
    views: [
      "https://www.google.com/maps/embed?pb=!4v1770379756663!6m8!1m7!1syIqMBuzwh2BiaUdDXlQlMg!2m2!1d28.52599315652015!2d77.1853733707347!3f192.52879994744373!4f6.274679701013767!5f0.4000000000000002",
      "https://www.google.com/maps/embed?pb=!4v1770379815560!6m8!1m7!1sWw6ZzduBOYWo_41D-vI5gQ!2m2!1d28.52485258158902!2d77.18609128850038!3f232.74061941106558!4f13.037681507427848!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770379849366!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHNyb0dtTkE.!2m2!1d28.52387956429979!2d77.18523140114864!3f135.60465091942135!4f4.482500659392713!5f0.7820865974627469"
    ],
  },
  {
    id: 3,
    title: "Gateway of India",
    location: "Mumbai, Maharashtra",
    thumbnail:
      "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770210649/gateofindia_r1h1xx.jpg",
    main360:
      "https://www.google.com/maps/embed?pb=!4v1769523558839!6m8!1m7!1s6eIE23uN3lERpVrddamF9Q!2m2!1d18.92230018838541!2d72.83430506423726!3f136.41!4f16.45!5f0.78",
    views: [
      "https://www.google.com/maps/embed?pb=!4v1770380740536!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRGUyLTdYZXc.!2m2!1d18.92187917754734!2d72.83468515565195!3f122.06040788129616!4f7.658978366419916!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770380772274!6m8!1m7!1sF3NGF6VB972DgiR1K_uPcg!2m2!1d18.92226546845403!2d72.83391090809307!3f219.72001289160195!4f-6.1196689906352475!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770380895248!6m8!1m7!1sAJL_Yq8sBTG8csBQKo-vWw!2m2!1d18.92173091742831!2d72.83345815063785!3f84.0416983321905!4f15.605483065741652!5f0.7820865974627469"
    ],
  },
  {
    id: 4,
    title: "Manali",
    location: "Himachal Pradesh",
    thumbnail:
      "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770211742/manali_xm0jsv.webp",
    main360:
      "https://www.google.com/maps/embed?pb=!4v1769524926940!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRDgyTmFHVFE.!2m2!1d32.23215077965724!2d77.2042718836075!3f281.32!4f6.14!5f0.4",
    views: [
      "https://www.google.com/maps/embed?pb=!4v1770379412072!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQzZnN1RmTVE.!2m2!1d32.24036576352849!2d77.22532999403397!3f45.041672267264694!4f10.67925910478705!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770381001582!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHM3TmVsT0E.!2m2!1d32.25132387214358!2d77.16686166730199!3f294.63996104323166!4f5.081949607034744!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770381037763!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHl5b0huRXc.!2m2!1d32.24551860613735!2d77.1578722400519!3f37.04932583139099!4f-13.69280059238828!5f0.7820865974627469"
    ],
  },
  {
    id: 5,
    title: "Raigad Fort",
    location: "Maharashtra",
    thumbnail:
      "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770212794/raigad_kumdjk.avif",
    main360:
      "https://www.google.com/maps/embed?pb=!4v1770241163439!6m8!1m7!1suNa5g1c4o4naiFETaq8kYA!2m2!1d18.23390654286355!2d73.44130109079275!3f231.0089574105506!4f-17.527944023247414!5f0.4000000000000002",
    views: [
      "https://www.google.com/maps/embed?pb=!4v1770240967992!6m8!1m7!1s1BIJVfwjWambrYRHtYH7JA!2m2!1d18.23357103180214!2d73.44076061353543!3f8.123787719065433!4f-21.89311926207361!5f0.4000000000000002",
      "https://www.google.com/maps/embed?pb=!4v1770241020892!6m8!1m7!1sT1INYM04sjlampBrdBGlAQ!2m2!1d18.23333355122077!2d73.4403015979218!3f25.723924454088944!4f-7.655630801922996!5f0.4000000000000002",
      "https://www.google.com/maps/embed?pb=!4v1770241103896!6m8!1m7!1svsM6HKKR9mpZo9Yz82dEGg!2m2!1d18.23396644342311!2d73.4405025578662!3f158.7176241424746!4f-23.592520045869605!5f0.4000000000000002",
      "https://www.google.com/maps/embed?pb=!4v1770241204480!6m8!1m7!1sJTSugl4c14iZvUZ2cKvCIg!2m2!1d18.23386741143375!2d73.44187132833284!3f266.1254284698689!4f2.3723532922207653!5f0.4000000000000002",
      "https://www.google.com/maps/embed?pb=!4v1770241273014!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJRDRwc19ubXdF!2m2!1d18.23240967521528!2d73.44549448605564!3f49.09155769253772!4f-4.589040154009467!5f0.4000000000000002",
      "https://www.google.com/maps/embed?pb=!4v1770241301764!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ01sTEdYeWdF!2m2!1d18.23981777019887!2d73.44124093792658!3f45.683281282005716!4f0!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770241339351!6m8!1m7!1sCAoSHENJQUJJaENxWG5PTVE5Q3JVR21wNmRWMElSWlQ.!2m2!1d18.23474606035914!2d73.43457861098081!3f164.66646195326143!4f-4.821362210994636!5f0.7820865974627469"
    ],
  },
  {
    id: 6,
    title: "Lakshadweep",
    location: "Lakshadweep Islands",
    thumbnail:
      "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770211742/laksh_qhbc3r.jpg",
    main360:
      "https://www.google.com/maps/embed?pb=!4v1770382008352!6m8!1m7!1s6NfSSDbjoUUkgu86bo-RhQ!2m2!1d10.86759838814143!2d72.19342139930473!3f255.0001324889604!4f1.4607712731214093!5f0.7820865974627469",
    views: [
      "https://www.google.com/maps/embed?pb=!4v1770386062372!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQzRscFAxRGc.!2m2!1d10.94505461519484!2d72.28819097960444!3f53.319423614694564!4f6.066096948311667!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770380461950!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzQ1NTJTMFFF!2m2!1d10.54224780872509!2d72.61927799149534!3f133.85053433211087!4f4.8031469709059!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770380579817!6m8!1m7!1shBdDtgacKz-JTFiaxPBXdQ!2m2!1d10.57588583625169!2d72.63938913780164!3f320.1437556486624!4f6.371797134539676!5f0.7820865974627469"
    ],
  },
  {
    id: 7,
    title: "Red Fort",
    location: "Delhi",
    thumbnail:
      "https://res.cloudinary.com/dxomv1ym0/image/upload/v1769792150/Red_Fort_Delhi_ehknv8.webp",
    main360:
      "https://www.google.com/maps/embed?pb=!4v1770381786412!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRDQzTno0TEE.!2m2!1d28.65577981629826!2d77.24235681282087!3f262.5834937804682!4f-4.93147522125453!5f0.7820865974627469",
    views: [
      "https://www.google.com/maps/embed?pb=!4v1770381500417!6m8!1m7!1sEbzpd3LDnnQzdJt9MJoZXA!2m2!1d28.6558311879375!2d77.24166370543284!3f105.06317219068686!4f-17.714264707414458!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770381752651!6m8!1m7!1sQAu-0hvq1mJNzvvmkvDDzA!2m2!1d28.65564236034802!2d77.24090595714809!3f127.77185475425064!4f1.4373686719800673!5f0.5425869790922632",
      "https://www.google.com/maps/embed?pb=!4v1770381845281!6m8!1m7!1scOxRps5cU_9cd3VuyE98ug!2m2!1d28.65581898154739!2d77.24196899592856!3f286.7559711302589!4f8.231072751242593!5f0.7820865974627469"
    ],
  },
  {
    id: 8,
    title: "Hampi",
    location: "Karnataka",
    thumbnail:
      "https://res.cloudinary.com/dxomv1ym0/image/upload/v1770212396/hampi_ipxt1r.jpg",
    main360:
      "https://www.google.com/maps/embed?pb=!4v1770381282750!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJREJxOGVqbndF!2m2!1d15.33507253307634!2d76.45894836913916!3f88.96431546183364!4f5.976481102117916!5f0.7820865974627469",
    views: [
      "https://www.google.com/maps/embed?pb=!4v1770381106812!6m8!1m7!1sv9uiMN9Gpzm7H9A4KIfTZw!2m2!1d15.33321052376412!2d76.45966458361569!3f281.08420604575065!4f1.500233693748342!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770381150141!6m8!1m7!1sLD5fYuM3WxEvsZ4sOi0JzA!2m2!1d15.33535800248459!2d76.45874175619694!3f358.53279350116236!4f-5.712804516100547!5f0.7820865974627469",
      "https://www.google.com/maps/embed?pb=!4v1770381186775!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJREV6SjNnQ0E.!2m2!1d15.33497873650568!2d76.46194850041748!3f357.66128927386916!4f17.225025038266594!5f0.7820865974627469"
    ],
  },
];

export default function Sample() {
  const router = useRouter();
  const [active, setActive] = useState(null);
  const [selectedView, setSelectedView] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                Incredible India
              </h1>
              <p className="text-xs sm:text-sm text-purple-900 mt-0.5 sm:mt-1 hidden sm:block">
                Explore iconic landmarks in 360°
              </p>
            </div>
            {active && (
              <button
                onClick={() => {
                  setActive(null);
                  setSelectedView(null);
                  setShowSidebar(false);
                }}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-900 hover:bg-purple-900 rounded-full transition-all duration-300 text-white shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Back to Gallery</span>
                <span className="sm:hidden">Back</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {!active && (
          <>
            <div className="text-center mb-6 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
                Choose Your Destination
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
                Immerse yourself in India's rich heritage and natural beauty
                through interactive 360° panoramas
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {DATA.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActive(item)}
                  className="group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl border border-gray-200 hover:border-purple-400 transition-all duration-300 hover:scale-105"
                >
                  <div className="relative h-36 sm:h-56 overflow-hidden">
                    {imageErrors[item.id] ? (
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <div className="text-center">
                          <svg className="w-10 h-10 sm:w-16 sm:h-16 mx-auto text-purple-300 mb-1 sm:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-purple-600 text-xs">Image unavailable</p>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        onError={() => handleImageError(item.id)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity" />

                    {/* 360° Badge */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-blue-600 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1 shadow-lg">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                      </svg>
                      360°
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-4 bg-white">
                    <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-0.5 sm:mb-1 group-hover:text-purple-900 transition-colors leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="truncate">{item.location}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {active && (
          <div className="space-y-3 sm:space-y-6 animate-fadeIn">
            {/* Title Section */}
            <div className="bg-white shadow-lg border border-gray-200 rounded-xl sm:rounded-2xl p-3 sm:p-6">
              <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                {active.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {active.location}
              </p>
            </div>

            {/* Mobile: Views toggle button */}
            <div className="flex gap-2 lg:hidden">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold shadow"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                {showSidebar ? 'Hide Views' : `Views (${(active.views?.length || 0) + 1})`}
              </button>
              {selectedView !== null && (
                <button
                  onClick={() => setSelectedView(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold shadow"
                >
                  Main View
                </button>
              )}
            </div>

            {/* Mobile: Horizontal scrollable thumbnails */}
            {showSidebar && (
              <div className="lg:hidden bg-white rounded-xl border border-gray-200 shadow p-3">
                <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Select View</p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {/* Main view thumbnail */}
                  <button
                    onClick={() => { setSelectedView(null); setShowSidebar(false); }}
                    className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedView === null ? 'border-blue-600 shadow-md' : 'border-gray-200'}`}
                  >
                    <div className="relative w-28 h-20">
                      <iframe src={active.main360} className="w-full h-full pointer-events-none" title="Main" />
                      <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-1">
                        <span className="bg-white/90 px-2 py-0.5 rounded-full text-xs font-semibold text-gray-800">Main</span>
                      </div>
                    </div>
                  </button>
                  {/* Alt views */}
                  {active.views?.map((view, index) => (
                    <button
                      key={index}
                      onClick={() => { setSelectedView(index); setShowSidebar(false); }}
                      className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedView === index ? 'border-blue-600 shadow-md' : 'border-gray-200'}`}
                    >
                      <div className="relative w-28 h-20">
                        <iframe src={view} className="w-full h-full pointer-events-none" title={`View ${index + 1}`} />
                        <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-1">
                          <span className="bg-white/90 px-2 py-0.5 rounded-full text-xs font-semibold text-gray-800">View {index + 1}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content with Right Sidebar (desktop) */}
            <div className="flex gap-6">
              {/* Main 360° View */}
              <div className="flex-1 min-w-0">
                <div className="bg-white shadow-lg border border-gray-200 rounded-xl sm:rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-900 px-3 sm:px-6 py-2 sm:py-3 border-b border-purple-600">
                    <p className="text-gray-100 font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                      </svg>
                      {selectedView !== null ? `Alternative View ${selectedView + 1}` : 'Main 360° View'}
                    </p>
                  </div>
                  {(selectedView !== null ? active.views[selectedView] : active.main360) ? (
                    <iframe
                      src={selectedView !== null ? active.views[selectedView] : active.main360}
                      className="w-full h-[45vh] sm:h-[70vh] bg-gray-100"
                      allowFullScreen
                      loading="lazy"
                      title={`360° view of ${active.title}`}
                    />
                  ) : (
                    <div className="w-full h-[45vh] sm:h-[70vh] bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-12 h-12 sm:w-20 sm:h-20 mx-auto text-purple-300 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-700 text-base sm:text-lg font-semibold">360° view not available</p>
                        <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">This location doesn't have a street view yet</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info Section */}
                <div className="mt-3 sm:mt-6 bg-gradient-to-r from-blue-100 to-pink-100 border border-purple-300 rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-md">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0 mt-0.5 sm:mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="text-gray-800 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">How to Explore</h3>
                      <ul className="text-gray-700 text-xs sm:text-sm space-y-0.5 sm:space-y-1">
                        <li>• Click and drag to look around in 360°</li>
                        <li>• Use arrow keys to navigate</li>
                        <li>• Scroll to zoom in and out</li>
                        <li>• Click fullscreen icon for immersive experience</li>
                        <li className="hidden sm:list-item">• Select alternative views from the sidebar</li>
                        <li className="sm:hidden">• Tap "Views" button to switch perspectives</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar — desktop only */}
              <div className="w-80 flex-shrink-0 hidden lg:block">
                <div className="bg-white shadow-lg border border-gray-200 rounded-2xl overflow-hidden sticky top-24">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-900 px-4 py-3 border-b border-purple-600">
                    <p className="text-white font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      Alternative Views ({active.views?.length || 0})
                    </p>
                  </div>

                  {/* Main View Option */}
                  <div className="p-3">
                    <button
                      onClick={() => setSelectedView(null)}
                      className={`w-full rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedView === null ? 'border-blue-600 shadow-lg scale-105' : 'border-gray-200 hover:border-blue-400'}`}
                    >
                      <div className="relative group">
                        <iframe
                          src={active.main360}
                          className="w-full h-32 pointer-events-none"
                          title="Main view thumbnail"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                          <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                            Main View
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Alternative Views */}
                  <div className="p-3 space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {active.views && active.views.length > 0 ? (
                      active.views.map((view, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedView(index)}
                          className={`w-full rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedView === index ? 'border-blue-600 shadow-lg scale-105' : 'border-gray-200 hover:border-blue-400'}`}
                        >
                          <div className="relative group">
                            <iframe
                              src={view}
                              className="w-full h-32 pointer-events-none"
                              title={`View ${index + 1} thumbnail`}
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                              <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                                View {index + 1}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-sm">No alternative views</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ✅ FIXED: multiline string joined to a single line */}
        <div className="mt-10 sm:mt-20 flex justify-center">
          <button
            onClick={() => router.push("/destination")}
            className="px-7 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            See More →
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
}