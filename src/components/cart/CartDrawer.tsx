'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, getCartSubtotal, removeItem, updateQuantity } = useCartStore();

  const subtotal = getCartSubtotal();
  const FREE_SHIPPING_THRESHOLD = 2000;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="cart-overlay" 
        onClick={closeCart}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(26, 26, 26, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          transition: 'opacity 0.3s'
        }} 
      />
      
      <div 
        className="cart-drawer"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '450px',
          height: '100%',
          backgroundColor: 'var(--ivory)',
          boxShadow: 'var(--shadow-strong)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s ease-out'
        }}
      >
        <div className="cart-header" style={{ padding: '1.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0, fontFamily: 'var(--font-serif)', fontWeight: 500 }}>Your Wellness Bag</h2>
          <button onClick={closeCart} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty" style={{ padding: '3rem 1.5rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--charcoal)', marginBottom: '1rem' }}>Your Wellness Bag is Waiting</h3>
            <p style={{ color: '#4B5563', marginBottom: '2rem' }}>Discover authentic Ayurvedic blends crafted for your daily routine.</p>
            <Link href="/collections" onClick={closeCart} className="btn btn-primary" style={{ display: 'inline-block' }}>
              Explore Best Sellers
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-shipping-progress" style={{ padding: '1rem 1.5rem', backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
              <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--charcoal)' }}>
                {remaining > 0 ? `You're ₹${remaining} away from free shipping.` : "You've unlocked free shipping!"}
              </p>
              <div style={{ height: '4px', background: '#E5E7EB', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--emerald)', transition: 'width 0.3s ease-out' }} />
              </div>
            </div>

            <div className="cart-items" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {items.map(item => (
                <div key={item.id} className="cart-item" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #F3F4F6' }}>
                  <div className="cart-item-img" style={{ width: '80px', height: '100px', position: 'relative', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#F9FAFB' }}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="cart-item-details" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Link href={`/products/${item.productId}`} onClick={closeCart} style={{ textDecoration: 'none', color: 'var(--charcoal)' }}>
                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{item.name}</h4>
                      </Link>
                      <button onClick={() => removeItem(item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: '1.2rem', padding: 0 }}>&times;</button>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>Size: {item.size}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem' }}>
                      <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E7EB', borderRadius: '4px' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>-</button>
                        <span style={{ fontSize: '0.9rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}>+</button>
                      </div>
                      <div style={{ fontWeight: 600, color: 'var(--charcoal)' }}>₹{item.price * item.quantity}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer" style={{ padding: '1.5rem', borderTop: '1px solid #E5E7EB', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '1rem', textAlign: 'center' }}>Taxes and shipping calculated at checkout</p>
              
              <Link href="/cart" onClick={closeCart} className="btn" style={{ display: 'block', textAlign: 'center', width: '100%', marginBottom: '0.75rem', border: '1px solid var(--charcoal)', padding: '1rem', color: 'var(--charcoal)', textDecoration: 'none' }}>
                View Full Cart
              </Link>
              <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}} />
    </>
  );
}
