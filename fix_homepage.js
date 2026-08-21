const fs = require('fs');
let c = fs.readFileSync('src/app/(storefront)/HomepageClient.tsx', 'utf8');

const newLogic = `
    const tabs = [
      { id: 'kids', label: 'Kids Nabhi Oil Care', image: '/images/products/nabhi-kids-smart-15ml.jpg' },
      { id: 'men', label: 'Men Nabhi Oil Care', image: '/images/products/nabhi-men-15ml.jpg' },
      { id: 'women', label: 'Women Nabhi Oil Care', image: '/images/products/nabhi-women-15ml.jpg' },
      { id: 'senior', label: 'Senior Nabhi Oil Care', image: '/images/products/nabhi-senior-15ml.jpg' },
      { id: 'feet', label: 'Feet Wellness Oil', image: '/images/category_feet_1784743921281.jpg' },
      { id: 'body', label: 'Body Massage Oil', image: '/images/category_feet_1784743921281.jpg' },
      { id: 'hair', label: 'Hair Wellness Oil', image: '/images/category_hair_1784743931871.jpg' },
      { id: 'trial', label: 'Trial Wellness Oil Packs', image: '/images/products/nabhi-kids-smart-10ml.jpg' },
      { id: 'gold', label: 'Gold Wellness Oil Packs', image: '/images/category_packs_1784743942477.jpg' }
    ];
    
    const [activeTab, setActiveTab] = useState(tabs[0].id);
  
    const filteredProducts = useMemo(() => {
      let filtered = products.filter(p => {
        const cat = p.category.toLowerCase();
        const name = p.name.toLowerCase();
        
        // Also show Trial pack when viewing any specific category
        const isTrial = name.includes('trial wellness pack') && !name.includes('diamond');
        
        switch(activeTab) {
          case 'kids': return cat.includes('kids') || isTrial;
          case 'men': return cat.includes('men') || isTrial;
          case 'women': return cat.includes('women') || isTrial;
          case 'senior': return cat.includes('senior') || isTrial;
          case 'feet': return cat.includes('feet') || isTrial;
          case 'body': return cat.includes('body') || isTrial;
          case 'hair': return cat.includes('hair') || isTrial;
          case 'trial': return p.variants.some(v => v.size.toLowerCase().includes('trial') || v.size.toLowerCase().includes('10ml') || v.size.toLowerCase().includes('10 ml'));
          case 'gold': return p.variants.some(v => v.size.toLowerCase().includes('gold') || v.size.toLowerCase().includes('15ml'));
          case 'premium': return p.variants.some(v => v.size.toLowerCase().includes('premium'));
          case 'family': return p.variants.some(v => v.size.toLowerCase().includes('family'));
          default: return false;
        }
      });
      
      return filtered.sort((a, b) => {
        if (a.name.toLowerCase().includes('trial') && !b.name.toLowerCase().includes('trial')) return -1;
        if (!a.name.toLowerCase().includes('trial') && b.name.toLowerCase().includes('trial')) return 1;
        return 0;
      });
    }, [products, activeTab]);
`;

c = c.replace(/const tabs = \[\s+\{ id: 'nabhi'[\s\S]*?\}, \[products, activeTab\]\);/m, newLogic.trim());

fs.writeFileSync('src/app/(storefront)/HomepageClient.tsx', c);
console.log('Fixed homepage tabs');
