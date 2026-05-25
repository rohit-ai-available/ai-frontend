import { useEffect, useRef, useState } from "react";

// ─── BUSINESS INFO — update these when you have real details ────────────────
const BIZ = {
  name:      "ਸ਼ਰਮਾ ਫਲੈਕਸ ਪ੍ਰਿੰਟਰਜ਼",
  nameEn:    "Sharma Flex Printers",
  tagline:   "ਤੁਹਾਡੀ ਪਛਾਣ, ਸਾਡੀ ਸ਼ਾਨ",
  phone:     "+91 98140-55627",
  phone2:    "+91 75890-12345",
  whatsapp:  "918728955110",   // ✅ FIX: Added country code 91 before number
  email:     "sharmaflexludhiana@gmail.com",
  address:   "ਦੁਕਾਨ ਨੰ. 14, ਗੁਰੂ ਨਾਨਕ ਮਾਰਕੀਟ, ਗਿੱਲ ਰੋਡ",
  city:      "ਲੁਧਿਆਣਾ, ਪੰਜਾਬ — 141003",
  landmark:  "ਨੇੜੇ: ਗਿੱਲ ਰੋਡ ਬੱਸ ਸਟੈਂਡ",
  hours:     "ਸੋਮ–ਸ਼ਨੀ: ਸਵੇਰੇ 9:00 ਤੋਂ ਰਾਤ 8:00 ਵਜੇ",
  sunday:    "ਐਤਵਾਰ: ਸਵੇਰੇ 10:00 ਤੋਂ ਦੁਪਹਿਰ 2:00 ਵਜੇ",
  estYear:   2014,
  owner:     "ਵਿਕਰਮ ਸ਼ਰਮਾ",
  facebook:  "https://facebook.com/sharmaflexludhiana",
  instagram: "https://instagram.com/sharmaflexludhiana",
};
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home","About","Services","Gallery","Pricing","Testimonials","Contact"];

const SERVICES = [
  { title:"ਫਲੈਕਸ ਬੈਨਰ",       desc:"2×3 ਤੋਂ 20×40 ਫੁੱਟ ਤੱਕ, 440 GSM ਮੌਸਮ-ਰੋਧਕ ਮਟੀਰੀਅਲ ਤੇ ਛਪਾਈ।", img:"https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=500&h=350&fit=crop&q=80", badge:"ਸਭ ਤੋਂ ਵੱਧ ਵਿਕਣ ਵਾਲਾ", grad:"linear-gradient(135deg,#667eea,#764ba2)" },
  { title:"ਵਿਨਾਇਲ ਸਟਿੱਕਰ",    desc:"ਕੱਟ-ਵਿਨਾਇਲ ਅਤੇ ਪ੍ਰਿੰਟਡ ਸਟਿੱਕਰ। UV-ਰੋਧਕ, 5 ਸਾਲ ਤੱਕ ਟਿਕਾਊ।",      img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=350&fit=crop&q=80", badge:"ਪ੍ਰੀਮੀਅਮ",            grad:"linear-gradient(135deg,#f093fb,#f5576c)" },
  { title:"ਡਿਜੀਟਲ ਪ੍ਰਿੰਟ",    desc:"1440 DPI ਫੋਟੋ-ਕੁਆਲਿਟੀ ਪ੍ਰਿੰਟ। ਕੈਨਵਸ ਅਤੇ ਸਿੰਥੈਟਿਕ ਪੇਪਰ ਤੇ।",    img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=350&fit=crop&q=80", badge:"ਹਾਈ ਰੈਜ਼ੋਲਿਊਸ਼ਨ",     grad:"linear-gradient(135deg,#4facfe,#00f2fe)" },
  { title:"LED ਸਾਈਨਬੋਰਡ",      desc:"ਬੈਕਲਿਟ LED ਸਾਈਨ — ਇੰਡੋਰ ਅਤੇ ਆਊਟਡੋਰ ਦੋਵਾਂ ਲਈ ਢੁੱਕਵੇਂ।",         img:"https://images.unsplash.com/photo-1609010697446-11f2155278f0?w=500&h=350&fit=crop&q=80", badge:"ਨਵਾਂ",               grad:"linear-gradient(135deg,#43e97b,#38f9d7)" },
  { title:"ਸ਼ਟਰ ਪ੍ਰਿੰਟ",       desc:"ਰੋਲਿੰਗ ਸ਼ਟਰ ਤੇ ਸਿੱਧੀ ਛਪਾਈ। ਗਾਹਕਾਂ ਨੂੰ ਦੂਰੋਂ ਦਿਸੇ।",              img:"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&h=350&fit=crop&q=80", badge:"ਖਾਸ",               grad:"linear-gradient(135deg,#fa709a,#fee140)" },
  { title:"ਪੋਸਟਰ ਅਤੇ ਪੈਂਫਲੈਟ", desc:"A4 ਤੋਂ A0 ਸਾਈਜ਼, ਮੈਟ ਅਤੇ ਗਲੌਸੀ ਫਿਨਿਸ਼। ਵੱਡੀ ਮਾਤਰਾ ਤੇ ਛੂਟ।",     img:"https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&h=350&fit=crop&q=80", badge:"ਕ੍ਰਿਏਟਿਵ",          grad:"linear-gradient(135deg,#a18cd1,#fbc2eb)" },
];

const GALLERY = [
  { img:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&q=80",  label:"ਰੈਸਤਰਾਂ ਬੈਨਰ" },
  { img:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop&q=80",  label:"ਕਿਰਾਨਾ ਸਟੋਰ ਬੈਨਰ" },
  { img:"https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&q=80", label:"ਕੱਪੜੇ ਦੀ ਦੁਕਾਨ ਬੈਨਰ" },
  { img:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop&q=80", label:"ਕੋਚਿੰਗ ਸੈਂਟਰ ਬੈਨਰ" },
  { img:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&q=80", label:"ਢਾਬਾ ਬੈਨਰ" },
  { img:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop&q=80", label:"ਸੈਲੂਨ ਬੈਨਰ" },
  { img:"https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&h=400&fit=crop&q=80", label:"ਮੈਡੀਕਲ ਸਟੋਰ ਬੈਨਰ" },
  { img:"https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&q=80", label:"ਜਿਮ ਸੈਂਟਰ ਬੈਨਰ" },
  { img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop&q=80", label:"ਮੋਬਾਈਲ ਸ਼ੌਪ ਬੈਨਰ" },
];

const FEATURES = [
  { icon:"⚡", title:"ਤੇਜ਼ ਡਿਲਿਵਰੀ",   desc:"ਜ਼ਿਆਦਾਤਰ ਆਰਡਰ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਤਿਆਰ। ਅਰਜੈਂਟ ਆਰਡਰ 4–6 ਘੰਟਿਆਂ ਵਿੱਚ।" },
  { icon:"🏆", title:"ਉੱਚ ਕੁਆਲਿਟੀ",    desc:"ROLAND ਅਤੇ MIMAKI ਪ੍ਰਿੰਟਰਜ਼, 440 GSM ਮਟੀਰੀਅਲ — ਧੁੱਪ ਅਤੇ ਮੀਂਹ ਰੋਧਕ।" },
  { icon:"💰", title:"ਸਹੀ ਕੀਮਤ",       desc:"ਕੋਈ ਲੁਕਵੀਂ ਫੀਸ ਨਹੀਂ। ਥੋਕ ਆਰਡਰ ਤੇ ਵਾਧੂ ਛੂਟ। GST ਬਿੱਲ ਉਪਲਬਧ।" },
  { icon:"🎨", title:"ਮੁਫ਼ਤ ਡਿਜ਼ਾਈਨ",   desc:"ਹਰ ਆਰਡਰ ਨਾਲ ਕਸਟਮ ਡਿਜ਼ਾਈਨ ਮੁਫ਼ਤ। ਅਸੀਮਤ ਸੋਧਾਂ ਜਦ ਤੱਕ ਤੁਸੀਂ ਖੁਸ਼ ਨਾ ਹੋਵੋ।" },
];

const STATS = [
  { val:"850+",  label:"ਖੁਸ਼ ਗਾਹਕ" },
  { val:"3200+", label:"ਪ੍ਰੋਜੈਕਟ ਪੂਰੇ" },
  { val:"10+",   label:"ਸਾਲਾਂ ਦਾ ਤਜ਼ਰਬਾ" },
  { val:"100+",  label:"ਡਿਜ਼ਾਈਨ ਟੈਮਪਲੇਟ" },
];

const PRICING = [
  { name:"ਬੇਸਿਕ",    price:"₹249",  badge:null,     featured:false, features:["2×3 ਫੁੱਟ ਫਲੈਕਸ ਬੈਨਰ","1 ਮੁਫ਼ਤ ਡਿਜ਼ਾਈਨ ਸੋਧ","48 ਘੰਟਿਆਂ ਵਿੱਚ ਤਿਆਰ","ਸਟੈਂਡਰਡ 280 GSM ਮਟੀਰੀਅਲ"] },
  { name:"ਸਟੈਂਡਰਡ",  price:"₹549",  badge:"ਮਸ਼ਹੂਰ", featured:true,  features:["4×6 ਫੁੱਟ ਫਲੈਕਸ ਬੈਨਰ","3 ਮੁਫ਼ਤ ਡਿਜ਼ਾਈਨ ਸੋਧਾਂ","24 ਘੰਟਿਆਂ ਵਿੱਚ ਤਿਆਰ","440 GSM ਵਾਟਰਪਰੂਫ਼ ਕੋਟਿੰਗ"] },
  { name:"ਪ੍ਰੀਮੀਅਮ", price:"₹1,199",badge:null,     featured:false, features:["6×10 ਫੁੱਟ ਫਲੈਕਸ ਬੈਨਰ","ਅਸੀਮਤ ਡਿਜ਼ਾਈਨ ਸੋਧਾਂ","ਉਸੇ ਦਿਨ ਡਿਲਿਵਰੀ","UV ਕੋਟਿੰਗ + ਮੁਫ਼ਤ ਇੰਸਟਾਲੇਸ਼ਨ"] },
];

const TESTIMONIALS = [
  { name:"ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ ਸੰਧੂ", role:"ਕਿਰਾਨਾ ਦੁਕਾਨਦਾਰ, ਗਿੱਲ ਰੋਡ",       initials:"ਗੁ", stars:5, color:"#667eea", quote:"ਵਿਕਰਮ ਜੀ ਨੇ ਮੇਰੀ ਦੁਕਾਨ ਦਾ ਬੈਨਰ ਇੱਕ ਦਿਨ ਵਿੱਚ ਤਿਆਰ ਕਰ ਦਿੱਤਾ। ਰੰਗ ਅਤੇ ਕੁਆਲਿਟੀ ਦੋਵੇਂ ਕਮਾਲ ਦੇ ਨੇ!" },
  { name:"ਰਵਨੀਤ ਕੌਰ",           role:"ਕੋਚਿੰਗ ਸੈਂਟਰ, ਸ਼ਾਸਤਰੀ ਨਗਰ",     initials:"ਰਵ", stars:5, color:"#f5576c", quote:"ਮੇਰੇ ਸੈਂਟਰ ਲਈ 10 ਪੋਸਟਰ ਬਣਵਾਏ — ਡਿਜ਼ਾਈਨ ਬਿਲਕੁਲ ਉਹੀ ਜੋ ਮੈਂ ਚਾਹੁੰਦੀ ਸੀ। ਬਹੁਤ ਜਲਦੀ ਡਿਲਿਵਰੀ ਮਿਲੀ।" },
  { name:"ਮਨਿੰਦਰ ਸਿੰਘ ਗਿੱਲ",   role:"ਕੱਪੜੇ ਵਾਲਾ, ਚੌੜਾ ਬਾਜ਼ਾਰ",       initials:"ਮਨ", stars:5, color:"#43e97b", quote:"5 ਸਾਲਾਂ ਤੋਂ ਸ਼ਰਮਾ ਫਲੈਕਸ ਤੋਂ ਕੰਮ ਕਰਵਾਉਂਦਾ ਹਾਂ। ਕੀਮਤ ਸਹੀ ਤੇ ਕੁਆਲਿਟੀ ਕਦੇ ਨਹੀਂ ਬਦਲੀ।" },
  { name:"ਸਿਮਰਨਜੀਤ ਢਿੱਲੋਂ",    role:"ਢਾਬਾ ਮਾਲਕ, ਫਿਰੋਜ਼ਪੁਰ ਰੋਡ",     initials:"ਸਿ", stars:4, color:"#FFB347", quote:"ਸ਼ਟਰ ਪ੍ਰਿੰਟ ਕਰਵਾਈ — ਸਾਰੇ ਰਾਹਗੀਰ ਰੁਕ ਕੇ ਦੇਖਦੇ ਨੇ। ਗਾਹਕਾਂ ਵਿੱਚ ਕਾਫ਼ੀ ਵਾਧਾ ਹੋਇਆ ਹੈ।" },
];

const STEPS = [
  { icon:"📞", title:"ਫ਼ੋਨ / WhatsApp ਕਰੋ", desc:"ਸਾਡੇ ਨਾਲ ਜ਼ਰੂਰਤ ਸਾਂਝੀ ਕਰੋ" },
  { icon:"🎨", title:"ਡਿਜ਼ਾਈਨ ਬਣਾਉਂਦੇ ਹਾਂ",  desc:"ਟੀਮ 2–3 ਘੰਟਿਆਂ ਵਿੱਚ ਡਿਜ਼ਾਈਨ ਭੇਜੇਗੀ" },
  { icon:"✅", title:"ਮਨਜ਼ੂਰੀ ਦਿਓ",           desc:"ਪਸੰਦ ਕਰੋ ਜਾਂ ਸੋਧ ਕਰਵਾਓ" },
  { icon:"🚚", title:"ਪ੍ਰਿੰਟ ਅਤੇ ਡਿਲਿਵਰੀ",   desc:"ਲੁਧਿਆਣਾ ਵਿੱਚ ਮੁਫ਼ਤ ਹੋਮ ਡਿਲਿਵਰੀ" },
];

const TICKER_ITEMS = [
  "ਦੁਕਾਨ ਬੈਨਰ","ਕਿਰਾਨਾ ਸਟੋਰ","ਕੱਪੜੇ ਦੀ ਦੁਕਾਨ","ਕੋਚਿੰਗ ਸੈਂਟਰ",
  "ਢਾਬਾ","ਸੈਲੂਨ","ਮੈਡੀਕਲ ਸਟੋਰ","ਰੈਸਤਰਾਂ","ਮੋਬਾਈਲ ਸ਼ੌਪ",
  "ਜਿਮ ਸੈਂਟਰ","ਮਿਠਾਈ ਦੀ ਦੁਕਾਨ","ਹਸਪਤਾਲ","ਸਕੂਲ","ਟਰੈਵਲ ਏਜੰਸੀ",
];

export default function SharmaFlex() {
  const [stars] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      width: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.7 + 0.2,
      animDur: 2 + Math.random() * 3,
      animDelay: Math.random() * 3,
    }))
  );

  const [tilt, setTilt]             = useState({ x:0, y:0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tick, setTick]             = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [hoveredGallery, setHoveredGallery] = useState(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    const id = setInterval(() => setTick((t) => t + 1), 50);
    return () => { window.removeEventListener("resize", onResize); clearInterval(id); };
  }, []);

  const handleMouseMove = (e) => {
    if (windowWidth < 768) return;
    const el = bannerRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2))  / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    setTilt({ x: dy * 8, y: dx * 8 });
  };

  const floatY  = Math.sin(tick * 0.04) * 10;
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  const S = {
    page:    { minHeight:"100vh", background:"#0f0c29", fontFamily:"'Noto Sans Gurmukhi',sans-serif", color:"#fff", overflowX:"hidden" },
    section: { padding: isMobile ? "60px 0" : "100px 0" },
    wrap:    { maxWidth:1100, margin:"0 auto", padding:"0 20px" },
    h2:      { fontSize: isMobile ? 28 : 42, fontWeight:900, color:"#FFB347", textAlign:"center", marginBottom: isMobile ? 32 : 56 },
    sub:     { textAlign:"center", color:"#ccd1d9", fontSize: isMobile ? 14 : 16, marginTop:-40, marginBottom:48 },
  };

  // ✅ FIX: waLink now uses the full number with country code (918728955110)
  // wa.me requires international format without + or spaces
  const waLink = (msg="") =>
    `https://wa.me/${BIZ.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;

  // ✅ FIX: openWhatsApp — always opens in new tab reliably
  const openWhatsApp = (msg="") => {
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Gurmukhi:wght@400;600;700;900&display=swap');
        @keyframes twinkle { 0%{opacity:.15;transform:scale(1)} 100%{opacity:1;transform:scale(1.5)} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        html { scroll-behavior:smooth; }
        .sf-a     { position:relative; transition:color .3s; text-decoration:none; color:#fff; font-weight:700; font-size:13px; text-transform:uppercase; letter-spacing:1.5px; }
        .sf-a:hover { color:#FFB347 !important; }
        .sf-mob   { padding:18px; border-bottom:1px solid rgba(255,255,255,.1); text-align:center; width:100%; display:block; color:#fff; text-decoration:none; font-weight:700; transition:background .2s; }
        .sf-mob:hover { background:rgba(255,179,71,.15); color:#FFB347; }
        .sf-svc   { transition:transform .3s,box-shadow .3s; }
        .sf-svc:hover { transform:translateY(-8px); box-shadow:0 30px 60px rgba(0,0,0,.5) !important; }
        .sf-gal   { overflow:hidden; position:relative; cursor:pointer; }
        .sf-gal img { transition:transform .4s; display:block; width:100%; height:100%; object-fit:cover; }
        .sf-gal:hover img { transform:scale(1.08); }
        .sf-gov   { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.85) 0%,transparent 60%); opacity:0; transition:opacity .3s; display:flex; align-items:flex-end; padding:16px; }
        .sf-gal:hover .sf-gov { opacity:1; }
        .sf-feat  { transition:transform .3s,background .3s; }
        .sf-feat:hover { transform:translateY(-6px); background:rgba(255,179,71,.12) !important; }
        .sf-prc   { transition:transform .3s; }
        .sf-prc:hover { transform:translateY(-6px); }
        .sf-test  { transition:transform .3s,box-shadow .3s; }
        .sf-test:hover { transform:translateY(-6px); box-shadow:0 24px 50px rgba(0,0,0,.4) !important; }
        .sf-fl    { display:block; color:#9ba8b5; text-decoration:none; font-size:14px; margin-bottom:10px; transition:color .2s; }
        .sf-fl:hover { color:#FFB347; }
        .sf-bp { background:#fff; color:#0f0c29; border:none; padding:14px 32px; border-radius:50px; font-weight:900; font-size:16px; cursor:pointer; font-family:'Noto Sans Gurmukhi',sans-serif; transition:transform .2s,box-shadow .2s; }
        .sf-bp:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(255,255,255,.2); }
        .sf-bo { background:transparent; color:#fff; border:2px solid rgba(255,255,255,.7); padding:14px 32px; border-radius:50px; font-weight:700; font-size:16px; cursor:pointer; font-family:'Noto Sans Gurmukhi',sans-serif; transition:border-color .2s,color .2s; }
        .sf-bo:hover { border-color:#FFB347; color:#FFB347; }
        .sf-bg { background:linear-gradient(135deg,#FFB347,#FF8C00); color:#0f0c29; border:none; padding:12px 28px; border-radius:50px; font-weight:900; font-size:14px; cursor:pointer; font-family:'Noto Sans Gurmukhi',sans-serif; transition:transform .2s,box-shadow .2s; }
        .sf-bg:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(255,179,71,.4); }
        .sf-bw { background:linear-gradient(135deg,#25D366,#128C7E); color:#fff; border:none; padding:15px 32px; border-radius:50px; font-weight:900; font-size:17px; cursor:pointer; font-family:'Noto Sans Gurmukhi',sans-serif; transition:transform .2s,box-shadow .2s; display:inline-flex; align-items:center; gap:10px; }
        .sf-bw:hover { transform:translateY(-3px); box-shadow:0 12px 30px rgba(37,211,102,.4); }
      `}</style>

      {/* Stars */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        {stars.map((s) => (
          <div key={s.id} style={{ position:"absolute", borderRadius:"50%", background:"#fff", width:s.width, height:s.width, top:`${s.top}%`, left:`${s.left}%`, opacity:s.opacity, animation:`twinkle ${s.animDur}s ${s.animDelay}s ease-in-out infinite alternate` }} />
        ))}
      </div>

      {/* ══ NAVBAR ══ */}
      <nav style={{ position:"fixed", top:0, width:"100%", zIndex:1000, background:"rgba(15,12,41,.96)", backdropFilter:"blur(14px)", borderBottom:"1px solid rgba(255,179,71,.2)", padding: isMobile ? "14px 0" : "18px 0" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:38, height:38, background:"linear-gradient(135deg,#FFB347,#FF6B35)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:900, color:"#0f0c29" }}>ਸ਼</div>
            <div>
              <span style={{ fontSize: isMobile ? 16 : 19, fontWeight:900, background:"linear-gradient(135deg,#FFB347,#FF8C00)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", display:"block" }}>ਸ਼ਰਮਾ ਫਲੈਕਸ</span>
              {!isMobile && <span style={{ fontSize:10, color:"#9ba8b5", letterSpacing:1 }}>GILL ROAD, LUDHIANA</span>}
            </div>
          </div>

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display:"flex", gap:26, alignItems:"center" }}>
              {NAV_LINKS.map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="sf-a">{l}</a>)}
              {/* ✅ FIX: Call button now uses onClick with tel: protocol correctly */}
              {/* <button type="button" className="sf-bg" style={{ padding:"10px 20px", fontSize:13 }}
                onClick={() => window.location.href = `tel:${BIZ.phone.replace(/\s|-/g,"")}`}>
                📞 ਕਾਲ ਕਰੋ
              </button> */}
            </div>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background:"none", border:"none", color:"#FFB347", fontSize:26, cursor:"pointer" }}>
              {isMenuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>

        {/* Mobile dropdown */}
        {isMobile && isMenuOpen && (
          <div style={{ background:"#0f0c29", position:"absolute", top:"100%", left:0, width:"100%", display:"flex", flexDirection:"column", alignItems:"center", borderBottom:"2px solid #FFB347", animation:"fadeUp .2s ease-out" }}>
            {NAV_LINKS.map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="sf-mob" onClick={() => setIsMenuOpen(false)}>{l}</a>)}
            {/* ✅ FIX: Mobile call link */}
            <a href={`tel:${BIZ.phone.replace(/\s|-/g,"")}`} className="sf-mob" style={{ color:"#FFB347" }}>📞 {BIZ.phone}</a>
          </div>
        )}
      </nav>

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ══ HERO ══ */}
        <section id="home" style={{ padding: isMobile ? "110px 20px 60px" : "160px 20px 100px", perspective:1500 }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div ref={bannerRef} onMouseMove={handleMouseMove} onMouseLeave={() => setTilt({x:0,y:0})}
              style={{ background:"linear-gradient(135deg,#FF6B35 0%,#c2410c 28%,#004E89 80%,#0f0c29 100%)", borderRadius: isMobile ? 24 : 40, overflow:"hidden", position:"relative", boxShadow:"0 40px 80px rgba(0,0,0,.7)", transform: isMobile ? "none" : `rotateX(${-tilt.x}deg) rotateY(${tilt.y}deg) translateY(${floatY}px)`, transition:"transform .15s ease-out", padding: isMobile ? "40px 28px" : "80px 70px", minHeight: isMobile ? "auto" : 480, display:"flex", alignItems:"center" }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop&q=60)", backgroundSize:"cover", backgroundPosition:"center", opacity:.12 }} />
              <div style={{ position:"absolute", top:-80, right:-80, width:350, height:350, borderRadius:"50%", background:"rgba(255,230,100,.12)" }} />
              <div style={{ position:"absolute", bottom:-60, left:-60, width:250, height:250, borderRadius:"50%", background:"rgba(0,78,137,.3)" }} />

              <div style={{ zIndex:2, position:"relative", maxWidth: isMobile ? "100%" : 580 }}>
                <span style={{ background:"rgba(255,255,255,.18)", padding:"6px 18px", borderRadius:50, fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,.25)" }}>
                  ✨ ਸਾਲ {BIZ.estYear} ਤੋਂ • ਗਿੱਲ ਰੋਡ, ਲੁਧਿਆਣਾ
                </span>
                <h1 style={{ fontSize:"clamp(32px,8vw,66px)", fontWeight:900, lineHeight:1.1, margin:"22px 0 14px", textShadow:"0 2px 20px rgba(0,0,0,.4)" }}>
                  ਤੁਹਾਡੀ ਪਛਾਣ,{" "}
                  <span style={{ color:"#FFE566", textShadow:"0 0 30px rgba(255,229,102,.5)" }}>ਸਾਡੀ ਸ਼ਾਨ</span>
                </h1>
                <p style={{ fontSize: isMobile ? 14 : 17, lineHeight:1.8, color:"rgba(255,255,255,.85)", marginBottom:8, maxWidth:480 }}>
                  ਫਲੈਕਸ ਬੈਨਰ, LED ਸਾਈਨ, ਵਿਨਾਇਲ ਸਟਿੱਕਰ, ਸ਼ਟਰ ਪ੍ਰਿੰਟ ਅਤੇ ਪੋਸਟਰ — ਸਭ ਇੱਕ ਥਾਂ ਤੋਂ।
                </p>
                <p style={{ fontSize:13, color:"rgba(255,255,255,.55)", marginBottom:28 }}>
                  📍 {BIZ.address} &nbsp;·&nbsp; 📞 {BIZ.phone}
                </p>
                <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                  {/* ✅ FIX: Uses openWhatsApp helper */}
                  <button type="button" className="sf-bp"
                    onClick={() => openWhatsApp("ਹੈਲੋ, ਮੈਂ ਆਰਡਰ ਕਰਨਾ ਚਾਹੁੰਦਾ ਹਾਂ")}>
                    WhatsApp ਤੇ ਆਰਡਰ ਕਰੋ →
                  </button>
                  <a href="#services" style={{ textDecoration:"none" }}>
                    <button type="button" className="sf-bo">ਸੇਵਾਵਾਂ ਦੇਖੋ</button>
                  </a>
                </div>
              </div>

              {!isMobile && (
                <div style={{ position:"absolute", right:40, top:"50%", transform:"translateY(-50%)", width:310, height:260, borderRadius:22, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,.5)", border:"3px solid rgba(255,255,255,.15)" }}>
                  <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&h=560&fit=crop&q=80" alt="Sharma Flex Ludhiana" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══ TICKER ══ */}
        <div style={{ background:"linear-gradient(90deg,#FFB347,#FF6B35,#FFB347)", padding:"13px 0", overflow:"hidden", borderTop:"2px solid rgba(255,255,255,.2)", borderBottom:"2px solid rgba(255,255,255,.2)" }}>
          <div style={{ display:"flex", width:"max-content", animation:"marquee 24s linear infinite" }}>
            {[...TICKER_ITEMS.map(t=>`a-${t}`),...TICKER_ITEMS.map(t=>`b-${t}`)].map((item) => (
              <span key={item} style={{ fontSize:15, fontWeight:700, color:"#0f0c29", padding:"0 22px", whiteSpace:"nowrap" }}>{item.slice(2)} •</span>
            ))}
          </div>
        </div>

        {/* ══ ABOUT ══ */}
        <section id="about" style={S.section}>
          <div style={S.wrap}>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 70, alignItems:"center" }}>
              <div style={{ borderRadius:28, overflow:"hidden", boxShadow:"0 30px 70px rgba(0,0,0,.5)", position:"relative" }}>
                <img src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=500&fit=crop&q=80" alt="Sharma Flex Print Shop" style={{ width:"100%", height: isMobile ? 250 : 430, objectFit:"cover", display:"block" }} />
                <div style={{ position:"absolute", bottom:20, left:20, background:"rgba(255,179,71,.95)", padding:"12px 20px", borderRadius:14, color:"#0f0c29", fontWeight:900, fontSize:14 }}>
                  🏆 ਸਾਲ {BIZ.estYear} ਤੋਂ ਸੇਵਾ ਵਿੱਚ
                </div>
              </div>
              <div>
                <span style={{ fontSize:12, fontWeight:700, color:"#FFB347", letterSpacing:2, textTransform:"uppercase" }}>ਸਾਡੇ ਬਾਰੇ</span>
                <h2 style={{ fontSize: isMobile ? 30 : 42, fontWeight:900, color:"#FFB347", margin:"12px 0 18px", lineHeight:1.2 }}>ਅਸੀਂ ਕੌਣ ਹਾਂ?</h2>
                <p style={{ fontSize: isMobile ? 14 : 16, lineHeight:1.85, color:"#ccd1d9", marginBottom:10 }}>
                  ਸਾਲ {BIZ.estYear} ਵਿੱਚ <strong style={{ color:"#FFB347" }}>{BIZ.owner}</strong> ਜੀ ਨੇ ਗਿੱਲ ਰੋਡ, ਲੁਧਿਆਣਾ ਵਿੱਚ ਸ਼ਰਮਾ ਫਲੈਕਸ ਪ੍ਰਿੰਟਰਜ਼ ਸ਼ੁਰੂ ਕੀਤੀ।
                </p>
                <p style={{ fontSize: isMobile ? 13 : 15, lineHeight:1.85, color:"#ccd1d9", marginBottom:26 }}>
                  ਅੱਜ ਅਸੀਂ ROLAND ਅਤੇ MIMAKI ਪ੍ਰਿੰਟਰਜ਼ ਨਾਲ 850 ਤੋਂ ਵੱਧ ਗਾਹਕਾਂ ਦੀ ਸੇਵਾ ਕਰਦੇ ਹਾਂ। GST ਬਿੱਲ ਅਤੇ ਲੁਧਿਆਣਾ ਵਿੱਚ ਮੁਫ਼ਤ ਹੋਮ ਡਿਲਿਵਰੀ ਉਪਲਬਧ।
                </p>
                {[
                  "ROLAND / MIMAKI ਪ੍ਰਿੰਟਰਜ਼ — 1440 DPI ਕ੍ਰਿਸਟਲ ਕਲੀਅਰ ਛਪਾਈ",
                  "440 GSM ਮਟੀਰੀਅਲ — ਧੁੱਪ, ਮੀਂਹ ਅਤੇ ਹਵਾ ਰੋਧਕ",
                  "GST ਬਿੱਲ ਉਪਲਬਧ • ਲੁਧਿਆਣਾ ਵਿੱਚ ਮੁਫ਼ਤ ਡਿਲਿਵਰੀ",
                ].map((pt) => (
                  <div key={pt} style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:13 }}>
                    <span style={{ minWidth:24, height:24, background:"linear-gradient(135deg,#FFB347,#FF6B35)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:"#0f0c29", flexShrink:0, marginTop:2 }}>✓</span>
                    <p style={{ color:"#ccd1d9", fontSize:14, lineHeight:1.6, margin:0 }}>{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section id="services" style={{ ...S.section, background:"rgba(255,255,255,.015)" }}>
          <div style={S.wrap}>
            <h2 style={S.h2}>ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ</h2>
            <p style={S.sub}>ਹਰ ਕਿਸਮ ਦੀ ਪ੍ਰਿੰਟਿੰਗ — ਇੱਕੋ ਦੁਕਾਨ, ਇੱਕੋ ਭਰੋਸਾ</p>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)", gap:22 }}>
              {SERVICES.map((svc) => (
                <div key={svc.title} className="sf-svc" style={{ background:"rgba(255,255,255,.04)", borderRadius:22, overflow:"hidden", border:"1px solid rgba(255,255,255,.08)", boxShadow:"0 8px 32px rgba(0,0,0,.3)" }}>
                  <div style={{ position:"relative" }}>
                    <img src={svc.img} alt={svc.title} style={{ width:"100%", height:195, objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(15,12,41,.8) 0%,transparent 60%)" }} />
                    <span style={{ position:"absolute", top:12, right:12, background:svc.grad, padding:"4px 13px", borderRadius:50, fontSize:11, fontWeight:700, color:"#fff" }}>{svc.badge}</span>
                  </div>
                  <div style={{ padding:"22px 22px 26px" }}>
                    <h3 style={{ fontSize:20, fontWeight:900, marginBottom:9, color:"#fff" }}>{svc.title}</h3>
                    <p style={{ color:"#9ba8b5", fontSize:13, lineHeight:1.7, marginBottom:18 }}>{svc.desc}</p>
                    {/* ✅ FIX: Uses openWhatsApp helper */}
                    <button type="button" className="sf-bg" style={{ fontSize:13, padding:"9px 20px" }}
                      onClick={() => openWhatsApp(`ਮੈਂ ${svc.title} ਬਾਰੇ ਕੀਮਤ ਜਾਣਨਾ ਚਾਹੁੰਦਾ ਹਾਂ`)}>
                      ਕੀਮਤ ਪੁੱਛੋ →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ GALLERY ══ */}
        <section id="gallery" style={S.section}>
          <div style={S.wrap}>
            <h2 style={S.h2}>ਸਾਡੇ ਕੰਮ ਦੀ ਝਲਕ</h2>
            <p style={S.sub}>ਵੱਖ-ਵੱਖ ਕਾਰੋਬਾਰਾਂ ਲਈ ਸਾਡੇ ਬੈਨਰ</p>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap:13 }}>
              {GALLERY.map((item) => (
                <div key={item.label} className="sf-gal" style={{ borderRadius:16, overflow:"hidden", height: isMobile ? 135 : 195, border:"2px solid rgba(255,255,255,.07)", boxShadow:"0 8px 24px rgba(0,0,0,.3)" }}
                  onMouseEnter={() => setHoveredGallery(item.label)} onMouseLeave={() => setHoveredGallery(null)}>
                  <img src={item.img} alt={item.label} />
                  <div className="sf-gov" style={{ opacity: hoveredGallery === item.label ? 1 : 0 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:"#FFB347", textShadow:"0 1px 4px rgba(0,0,0,.6)" }}>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY US ══ */}
        <section style={{ ...S.section, background:"rgba(255,255,255,.02)" }}>
          <div style={S.wrap}>
            <h2 style={S.h2}>ਸਾਨੂੰ ਕਿਉਂ ਚੁਣੋ?</h2>
            <p style={S.sub}>ਸਾਡੇ ਨਾਲ ਤੁਹਾਡਾ ਕਾਰੋਬਾਰ ਚਮਕੇਗਾ</p>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap:22 }}>
              {FEATURES.map((f) => (
                <div key={f.title} className="sf-feat" style={{ display:"flex", alignItems:"center", gap:22, background:"rgba(255,255,255,.04)", borderRadius:22, padding:"26px 30px", border:"1px solid rgba(255,179,71,.15)" }}>
                  <div style={{ fontSize:38, minWidth:58, height:58, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,179,71,.1)", borderRadius:15 }}>{f.icon}</div>
                  <div>
                    <h3 style={{ fontSize:18, fontWeight:900, color:"#FFB347", marginBottom:6 }}>{f.title}</h3>
                    <p style={{ color:"#9ba8b5", fontSize:13, lineHeight:1.65, margin:0 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section style={{ padding:"60px 20px" }}>
          <div style={{ maxWidth:1100, margin:"0 auto", background:"linear-gradient(135deg,rgba(255,179,71,.15),rgba(255,107,53,.1))", borderRadius:34, padding: isMobile ? "38px 22px" : "58px 40px", border:"1px solid rgba(255,179,71,.3)", display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: isMobile ? 28 : 0, textAlign:"center" }}>
            {STATS.map((s,i) => (
              <div key={s.label} style={{ borderRight: !isMobile && i < STATS.length-1 ? "1px solid rgba(255,179,71,.25)" : "none", padding:"0 18px" }}>
                <h4 style={{ fontSize: isMobile ? 34 : 46, fontWeight:900, color:"#FFB347", margin:"0 0 7px", lineHeight:1 }}>{s.val}</h4>
                <p style={{ color:"#ccd1d9", fontSize:14, margin:0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ PRICING ══ */}
        <section id="pricing" style={{ ...S.section, background:"rgba(255,255,255,.015)" }}>
          <div style={S.wrap}>
            <h2 style={S.h2}>ਸਾਡੇ ਪੈਕੇਜ</h2>
            <p style={S.sub}>ਹਰ ਬਜ਼ਟ ਲਈ — ਕੀਮਤਾਂ ਸਾਈਜ਼ ਅਨੁਸਾਰ ਵੱਖ ਹੋ ਸਕਦੀਆਂ ਨੇ</p>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap:22, alignItems:"start" }}>
              {PRICING.map((pkg) => (
                <div key={pkg.name} className="sf-prc" style={{ background: pkg.featured ? "linear-gradient(135deg,rgba(255,179,71,.12),rgba(255,107,53,.08))" : "rgba(255,255,255,.04)", borderRadius:26, padding:"34px 28px", border: pkg.featured ? "2px solid #FFB347" : "1px solid rgba(255,255,255,.08)", position:"relative", boxShadow: pkg.featured ? "0 20px 60px rgba(255,179,71,.2)" : "0 8px 32px rgba(0,0,0,.2)", transform: pkg.featured && !isMobile ? "scale(1.04)" : "scale(1)" }}>
                  {pkg.badge && (
                    <div style={{ position:"absolute", top:-13, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#FFB347,#FF6B35)", color:"#0f0c29", padding:"4px 18px", borderRadius:50, fontSize:12, fontWeight:900, whiteSpace:"nowrap" }}>⭐ {pkg.badge}</div>
                  )}
                  <h3 style={{ fontSize:23, fontWeight:900, color: pkg.featured ? "#FFB347" : "#fff", marginBottom:7 }}>{pkg.name}</h3>
                  <div style={{ fontSize:38, fontWeight:900, color: pkg.featured ? "#FFB347" : "#fff", lineHeight:1.1, marginBottom:3 }}>{pkg.price}</div>
                  <p style={{ color:"#9ba8b5", fontSize:12, marginBottom:22 }}>ਤੋਂ ਸ਼ੁਰੂ (GST ਵੱਖ)</p>
                  <hr style={{ border:"none", borderTop:"1px solid rgba(255,255,255,.1)", marginBottom:18 }} />
                  {pkg.features.map((f) => (
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:9, marginBottom:12 }}>
                      <span style={{ color: pkg.featured ? "#FFB347" : "#43e97b", fontSize:14 }}>✓</span>
                      <span style={{ color:"#ccd1d9", fontSize:13 }}>{f}</span>
                    </div>
                  ))}
                  {/* ✅ FIX: Uses openWhatsApp helper */}
                  <button type="button" style={{ marginTop:20, width:"100%", padding:"13px", borderRadius:14, border: pkg.featured ? "none" : "2px solid rgba(255,179,71,.5)", background: pkg.featured ? "linear-gradient(135deg,#FFB347,#FF6B35)" : "transparent", color: pkg.featured ? "#0f0c29" : "#FFB347", fontWeight:900, fontSize:15, cursor:"pointer", fontFamily:"'Noto Sans Gurmukhi',sans-serif" }}
                    onClick={() => openWhatsApp(`ਮੈਂ ${pkg.name} ਪੈਕੇਜ ਦਾ ਆਰਡਰ ਕਰਨਾ ਚਾਹੁੰਦਾ ਹਾਂ`)}>
                    ਆਰਡਰ ਕਰੋ
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section id="testimonials" style={S.section}>
          <div style={S.wrap}>
            <h2 style={S.h2}>ਗਾਹਕਾਂ ਦੀਆਂ ਰਾਵਾਂ</h2>
            <p style={S.sub}>ਲੁਧਿਆਣਾ ਦੇ ਅਸਲ ਗਾਹਕ ਕੀ ਕਹਿੰਦੇ ਹਨ</p>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap:22 }}>
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="sf-test" style={{ background:"rgba(255,255,255,.04)", borderRadius:22, padding:"28px", border:"1px solid rgba(255,255,255,.08)", boxShadow:"0 10px 30px rgba(0,0,0,.2)" }}>
                  <div style={{ marginBottom:13 }}>
                    {Array.from({length:5},(_,si)=>si).map((si)=>(
                      <span key={si} style={{ color: si < t.stars ? "#FFB347" : "#333", fontSize:17 }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize:14, lineHeight:1.75, color:"#ccd1d9", marginBottom:20, fontStyle:"italic" }}>"{t.quote}"</p>
                  <div style={{ display:"flex", alignItems:"center", gap:13 }}>
                    <div style={{ width:46, height:46, borderRadius:"50%", background:t.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:900, color:"#fff", flexShrink:0 }}>{t.initials}</div>
                    <div>
                      <p style={{ margin:0, fontWeight:700, color:"#fff", fontSize:14 }}>{t.name}</p>
                      <p style={{ margin:0, color:"#9ba8b5", fontSize:12 }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROCESS ══ */}
        <section style={{ ...S.section, background:"rgba(255,255,255,.02)" }}>
          <div style={S.wrap}>
            <h2 style={S.h2}>ਇਸ ਤਰ੍ਹਾਂ ਕੰਮ ਕਰਦੇ ਹਾਂ</h2>
            <p style={S.sub}>ਆਰਡਰ ਤੋਂ ਡਿਲਿਵਰੀ ਤੱਕ — ਸਿਰਫ਼ ਚਾਰ ਕਦਮ</p>
            <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center" }}>
              {STEPS.map((step,i) => (
                <div key={step.title} style={{ display:"flex", flexDirection: isMobile ? "row" : "column", alignItems:"center", flex: isMobile ? "unset" : 1, gap: isMobile ? 18 : 14, textAlign: isMobile ? "left" : "center", marginBottom: isMobile ? 30 : 0, position:"relative" }}>
                  <div style={{ flexShrink:0 }}>
                    <div style={{ width: isMobile ? 58 : 74, height: isMobile ? 58 : 74, borderRadius:"50%", background:"linear-gradient(135deg,#FFB347,#FF6B35)", display:"flex", alignItems:"center", justifyContent:"center", fontSize: isMobile ? 22 : 28, boxShadow:"0 10px 30px rgba(255,179,71,.4)", margin: isMobile ? "0" : "0 auto 14px" }}>{step.icon}</div>
                    {isMobile && i < STEPS.length-1 && (
                      <div style={{ width:2, height:26, background:"linear-gradient(to bottom,#FFB347,rgba(255,179,71,.2))", margin:"7px auto 0", marginLeft:28 }} />
                    )}
                  </div>
                  <div style={{ flex:1 }}>
                    <h4 style={{ fontSize: isMobile ? 15 : 14, fontWeight:900, color:"#FFB347", marginBottom:4 }}>{step.title}</h4>
                    <p style={{ color:"#9ba8b5", fontSize:13, margin:0 }}>{step.desc}</p>
                  </div>
                  {!isMobile && i < STEPS.length-1 && (
                    <div style={{ position:"absolute", right:-18, top:34, height:2, background:"linear-gradient(90deg,#FFB347,rgba(255,179,71,.2))", width:38 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section id="contact" style={S.section}>
          <div style={S.wrap}>
            <h2 style={S.h2}>ਸੰਪਰਕ ਕਰੋ</h2>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:38, alignItems:"center" }}>
              <div style={{ background:"linear-gradient(135deg,#1a1a2e,#16213e)", borderRadius:28, padding: isMobile ? "34px 22px" : "46px 38px", border:"1px solid rgba(255,107,53,.4)", boxShadow:"0 20px 50px rgba(0,0,0,.3)" }}>
                <h3 style={{ fontSize: isMobile ? 24 : 28, fontWeight:900, marginBottom:26, color:"#fff" }}>ਸਾਡੇ ਨਾਲ ਗੱਲ ਕਰੋ</h3>
                {[
                  { icon:"📞", label:"ਫ਼ੋਨ",        value:`${BIZ.phone}  /  ${BIZ.phone2}` },
                  { icon:"💬", label:"WhatsApp",    value: BIZ.phone },
                  { icon:"📧", label:"ਈਮੇਲ",        value: BIZ.email },
                  { icon:"📍", label:"ਪਤਾ",          value:`${BIZ.address}, ${BIZ.city}` },
                  { icon:"📌", label:"ਲੈਂਡਮਾਰਕ",    value: BIZ.landmark },
                  { icon:"🕐", label:"ਦੁਕਾਨ ਸਮਾਂ",  value: BIZ.hours },
                  { icon:"📅", label:"ਐਤਵਾਰ",        value: BIZ.sunday },
                ].map((info) => (
                  <div key={info.label} style={{ display:"flex", alignItems:"flex-start", gap:13, marginBottom:16 }}>
                    <span style={{ fontSize:18, width:38, height:38, background:"rgba(255,179,71,.12)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{info.icon}</span>
                    <div>
                      <p style={{ color:"#9ba8b5", fontSize:10, margin:"0 0 2px", fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>{info.label}</p>
                      <p style={{ color:"#FFB347", fontSize:14, margin:0, fontWeight:700 }}>{info.value}</p>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop:24 }}>
                  {/* ✅ FIX: Uses openWhatsApp helper */}
                  <button type="button" className="sf-bw" onClick={() => openWhatsApp()}>
                    <span style={{ fontSize:20 }}>💬</span>
                    WhatsApp ਤੇ ਸੰਦੇਸ਼ ਭੇਜੋ
                  </button>
                </div>
              </div>
              <div style={{ borderRadius:28, overflow:"hidden", boxShadow:"0 30px 70px rgba(0,0,0,.5)", height: isMobile ? 250 : 520 }}>
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=500&fit=crop&q=80" alt="Sharma Flex Office" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer style={{ background:"rgba(255,255,255,.02)", borderTop:"1px solid rgba(255,255,255,.08)", padding: isMobile ? "38px 20px 22px" : "58px 40px 26px" }}>
          <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr 1fr", gap: isMobile ? 34 : 56, marginBottom:36 }}>
            {/* Brand */}
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:13 }}>
                <div style={{ width:38, height:38, background:"linear-gradient(135deg,#FFB347,#FF6B35)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, fontWeight:900, color:"#0f0c29" }}>ਸ਼</div>
                <div>
                  <span style={{ fontSize:18, fontWeight:900, color:"#FFB347", display:"block" }}>ਸ਼ਰਮਾ ਫਲੈਕਸ ਪ੍ਰਿੰਟਰਜ਼</span>
                  <span style={{ fontSize:10, color:"#9ba8b5", letterSpacing:1 }}>EST. {BIZ.estYear} • LUDHIANA, PUNJAB</span>
                </div>
              </div>
              <p style={{ color:"#9ba8b5", fontSize:13, lineHeight:1.7, maxWidth:270, margin:"0 0 6px" }}>{BIZ.tagline}</p>
              <p style={{ color:"#9ba8b5", fontSize:13, margin:"0 0 5px" }}>{BIZ.address}</p>
              <p style={{ color:"#9ba8b5", fontSize:13, margin:"0 0 5px" }}>{BIZ.city}</p>
              <p style={{ color:"#FFB347", fontSize:14, fontWeight:700, margin:"0 0 16px" }}>{BIZ.phone}</p>
              <div style={{ display:"flex", gap:14 }}>
                <a href={BIZ.facebook}  target="_blank" rel="noopener noreferrer" style={{ fontSize:20, textDecoration:"none" }} title="Facebook">📘</a>
                <a href={BIZ.instagram} target="_blank" rel="noopener noreferrer" style={{ fontSize:20, textDecoration:"none" }} title="Instagram">📸</a>
                {/* ✅ FIX: Footer WhatsApp icon also uses correct number */}
                <button type="button" onClick={() => openWhatsApp()} style={{ fontSize:20, background:"none", border:"none", cursor:"pointer", padding:0 }} title="WhatsApp">💬</button>
              </div>
            </div>
            {/* Links */}
            <div>
              <h4 style={{ fontSize:15, fontWeight:900, color:"#FFB347", marginBottom:15 }}>ਤੇਜ਼ ਲਿੰਕ</h4>
              {["Home","About","Services","Gallery","Pricing","Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="sf-fl">{l}</a>
              ))}
            </div>
            {/* Services list */}
            <div>
              <h4 style={{ fontSize:15, fontWeight:900, color:"#FFB347", marginBottom:15 }}>ਸੇਵਾਵਾਂ</h4>
              {SERVICES.map((svc) => (
                <p key={svc.title} style={{ color:"#9ba8b5", fontSize:13, marginBottom:9 }}>{svc.title}</p>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div style={{ maxWidth:1100, margin:"0 auto", paddingTop:20, borderTop:"1px solid rgba(255,255,255,.08)", display:"flex", flexDirection: isMobile ? "column" : "row", justifyContent:"space-between", alignItems:"center", gap:9 }}>
            <p style={{ color:"#555", fontSize:12, margin:0 }}>
              © {new Date().getFullYear()} {BIZ.nameEn}. ਸਾਰੇ ਹੱਕ ਰਾਖਵੇਂ ਹਨ।
            </p>
            <p style={{ color:"#555", fontSize:12, margin:0 }}>
              ਮਾਲਕ: {BIZ.owner} &nbsp;·&nbsp; ਗਿੱਲ ਰੋਡ, ਲੁਧਿਆਣਾ
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}