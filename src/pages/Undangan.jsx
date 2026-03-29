import Hero from '../components/Hero';
import Mempelai from '../components/Mempelai';
import Acara from '../components/Acara';
import LokasiAcara from '../components/LokasiAcara';
import WeddingGift from '../components/WeddingGift';
import Footer from '../components/Footer';
import GallerySection from '../components/Gallery';

export default function Undangan() {
  return (
    <div className="font-sans bg-pink-50 flex flex-col">
      <Hero />
      <Mempelai />
      <Acara />
      <LokasiAcara />
      <GallerySection />
      <WeddingGift />
      <Footer />
    </div>
  );
}
