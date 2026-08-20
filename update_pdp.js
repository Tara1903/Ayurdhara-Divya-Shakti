const fs = require('fs');
let code = fs.readFileSync('src/components/PDPClient.tsx', 'utf8');

const target = `      {/* Product Details Section (Ingredients, How to Use, Specs) */}
      <div className="bg-white border-t border-gray-200 py-10 mt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-xl font-bold mb-6 text-gray-900">Product information</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">`;

const replacement = `      {/* Product Details Section (Ingredients, How to Use, Specs) */}
      <div className="bg-white border-t border-gray-200 py-10 mt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-xl font-bold mb-6 text-gray-900">Product information</h2>
           
           <div className="mb-8 space-y-4">
             <div>
               <h3 className="font-bold text-base mb-2 text-gray-900">Wellness Experience</h3>
               <p className="text-sm text-gray-700 leading-relaxed mb-2">{product.fullDescription}</p>
               <p className="text-sm text-gray-700 leading-relaxed">{product.story}</p>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-8">
             <div>
               <h3 className="font-bold text-base mb-3 text-gray-900">How to Use</h3>
               <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 h-full">
                  <p className="text-sm text-gray-900 mb-2"><strong className="font-semibold text-emerald-900">Serving:</strong> {product.usageInstructions.serving}</p>
                  <p className="text-sm text-gray-900 mb-2"><strong className="font-semibold text-emerald-900">Timing:</strong> {product.usageInstructions.timing}</p>
                  <p className="text-sm text-gray-900"><strong className="font-semibold text-emerald-900">Instructions:</strong> {product.usageInstructions.instructions}</p>
               </div>
             </div>
             
             <div>
               <h3 className="font-bold text-base mb-3 text-gray-900">Ideal For</h3>
               <div className="flex flex-wrap gap-2">
                 {product.idealFor.map((item, idx) => (
                   <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full font-medium border border-gray-200">
                     {item}
                   </span>
                 ))}
               </div>
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/PDPClient.tsx', code);
  console.log('Successfully updated PDPClient.tsx');
} else {
  console.log('Target string not found in PDPClient.tsx');
}
