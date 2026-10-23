const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('.'));

app.get('/', (req, res) => {
    let data;
    try {
        data = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
    } catch (e) {
        data = { storeName: "Kaze Market", products: [], categories: ["Semua"], socialLinks: [], testimonials: [] };
    }

    const html = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${data.storeName}</title>
        <style>
            * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
            body { background-color: #020202; color: #f3f4f6; margin: 0; padding: 0; display: flex; justify-content: center; }
            .app-container { width: 100%; max-width: 480px; min-height: 100vh; background: #070709; border-left: 1px solid #141419; border-right: 1px solid #141419; padding-bottom: 50px; box-shadow: 0 0 40px rgba(56,189,248,0.05); }
            header { display: flex; justify-content: space-between; align-items: center; padding: 18px 20px; border-bottom: 1px solid #141419; background: rgba(7,7,9,0.92); backdrop-filter: blur(15px); position: sticky; top: 0; z-index: 10; }
            .logo { font-size: 18px; font-weight: 800; color: #fff; letter-spacing: 1.5px; text-transform: uppercase; }
            .logo span { color: #38bdf8; text-shadow: 0 0 10px rgba(56,189,248,0.5); }
            .social-top-btn { background: linear-gradient(135deg, rgba(56,189,248,0.15), rgba(2,132,199,0.15)); color: #38bdf8; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; border: 1px solid rgba(56, 189, 248, 0.35); cursor: pointer; transition: 0.2s; box-shadow: 0 0 12px rgba(56,189,248,0.15); }
            .social-top-btn:hover { background: rgba(56, 189, 248, 0.25); border-color: #38bdf8; }
            .banner-container { padding: 20px 20px 10px 20px; }
            .welcome-banner { position: relative; width: 100%; height: 190px; border-radius: 18px; overflow: hidden; border: 1px solid rgba(56,189,248,0.3); background: #000; box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(56,189,248,0.1); }
            .welcome-banner img { width: 108%; height: 108%; object-fit: cover; position: absolute; top: -4%; left: -4%; animation: characterAlive 8s infinite ease-in-out; }
            @keyframes characterAlive { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-3px, -2px) scale(1.025); } }
            .banner-light-center { position: absolute; top: 52%; left: 41.5%; transform: translate(-50%, -50%); width: 12px; height: 12px; background: #ffffff; border-radius: 50%; box-shadow: 0 0 20px 8px #ffffff, 0 0 45px 22px rgba(255, 255, 255, 0.8), 0 0 70px 35px rgba(255, 255, 255, 0.4); pointer-events: none; z-index: 2; }
            .energy-ray { position: absolute; top: 52%; left: 41.5%; width: 120px; height: 1.5px; background: linear-gradient(90deg, transparent, #ffffff, transparent); box-shadow: 0 0 12px #ffffff, 0 0 20px rgba(255, 255, 255, 0.8); transform-origin: left center; pointer-events: none; z-index: 2; animation: raySpin 6s linear infinite; }
            .ray-1 { animation-delay: 0s; } .ray-2 { animation-delay: -1.5s; } .ray-3 { animation-delay: -3s; } .ray-4 { animation-delay: -4.5s; }
            @keyframes raySpin { 0% { transform: rotate(0deg) scaleX(0.7); opacity: 0.6; } 50% { transform: rotate(180deg) scaleX(1.3); opacity: 1; } 100% { transform: rotate(360deg) scaleX(0.7); opacity: 0.6; } }
            .wind-particle { position: absolute; top: 52%; left: 41.5%; width: 40px; height: 2px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent); border-radius: 50%; box-shadow: 0 0 8px rgba(255,255,255,0.8); pointer-events: none; z-index: 2; opacity: 0; animation: swirlSuction 2.2s infinite cubic-bezier(0.4, 0, 0.2, 1); }
            .wp-1 { --tx: -120px; --ty: -80px; --rot: 30deg; animation-delay: 0s; } .wp-2 { --tx: -130px; --ty: 60px; --rot: -45deg; animation-delay: 0.35s; } .wp-3 { --tx: 125px; --ty: -70px; --rot: 120deg; animation-delay: 0.7s; } .wp-4 { --tx: 110px; --ty: 80px; --rot: 210deg; animation-delay: 1.05s; } .wp-5 { --tx: -90px; --ty: -110px; --rot: 60deg; animation-delay: 1.4s; } .wp-6 { --tx: 95px; --ty: -100px; --rot: -120deg; animation-delay: 1.75s; }
            @keyframes swirlSuction { 0% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0.4); opacity: 0; } 30% { opacity: 0.9; } 100% { transform: translate(0, 0) rotate(calc(var(--rot) + 180deg)) scale(1.4); opacity: 0; } }
            .banner-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to top, rgba(5,5,5,0.92) 10%, rgba(5,5,5,0.3) 60%, transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 18px; z-index: 3; }
            .banner-title { font-size: 16px; font-weight: 800; color: #fff; margin: 0 0 2px 0; text-shadow: 0 2px 6px rgba(0,0,0,0.9); letter-spacing: 0.5px; }
            .banner-subtitle { font-size: 11px; color: #38bdf8; margin: 0; font-weight: 600; letter-spacing: 0.5px; }
            .container { padding: 0 20px; }
            .policy-banner { background: linear-gradient(135deg, rgba(56,189,248,0.1), rgba(15,23,42,0.8)); border: 1px solid rgba(56,189,248,0.3); border-radius: 14px; padding: 14px; margin: 16px 0; text-align: center; }
            .policy-title { font-size: 12px; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
            .policy-desc { font-size: 11px; color: #a3a3a3; line-height: 1.4; margin: 0; }
            .category-scroll { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 14px; scrollbar-width: none; }
            .category-scroll::-webkit-scrollbar { display: none; }
            .category-tab { background: #0e0e12; border: 1px solid #1f1f26; color: #a3a3a3; padding: 8px 16px; border-radius: 20px; font-size: 11px; font-weight: 700; white-space: nowrap; cursor: pointer; transition: 0.2s; }
            .category-tab.active { background: #38bdf8; color: #000; border-color: #38bdf8; box-shadow: 0 0 12px rgba(56,189,248,0.3); }
            .section-title { font-size: 13px; font-weight: 700; color: #737373; text-transform: uppercase; letter-spacing: 1px; margin: 20px 0 12px 0; }
            .product-card { background: #0e0e12; border: 1px solid #1a1a22; border-radius: 16px; padding: 18px; margin-bottom: 12px; cursor: pointer; transition: 0.2s ease; box-shadow: 0 4px 20px rgba(0,0,0,0.4); }
            .product-card:hover { border-color: #38bdf8; background: #121218; transform: translateY(-2px); }
            .tag { display: inline-block; background: rgba(56, 189, 248, 0.1); color: #38bdf8; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 6px; margin-bottom: 8px; border: 1px solid rgba(56, 189, 248, 0.2); }
            .product-title { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 6px; }
            .product-desc { font-size: 12px; color: #888; margin-bottom: 14px; line-height: 1.4; }
            .product-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #16161d; padding-top: 12px; font-size: 13px; }
            .price { font-weight: 700; color: #38bdf8; font-size: 15px; }
            .detail-link { color: #737373; font-size: 12px; font-weight: 500; }
            .store-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
            .stat-box { background: #0e0e12; border: 1px solid #1a1a22; border-radius: 12px; padding: 10px; text-align: center; }
            .stat-num { font-size: 14px; font-weight: 800; color: #38bdf8; margin-bottom: 2px; }
            .stat-label { font-size: 10px; color: #737373; text-transform: uppercase; font-weight: 600; }
            .empty-reviews { background: #0e0e12; border: 1px solid #1a1a22; border-radius: 14px; padding: 20px; text-align: center; color: #737373; font-size: 12px; }
            .testimonial-card { background: #0e0e12; border: 1px solid #1a1a22; border-radius: 14px; padding: 14px; margin-bottom: 10px; font-size: 12px; }
            .testimonial-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
            .testimonial-name { font-weight: 700; color: #fff; font-size: 12px; }
            .testimonial-stars { color: #38bdf8; font-size: 11px; font-weight: 700; }
            .testimonial-text { color: #888; font-size: 11px; line-height: 1.4; margin: 0 0 10px 0; }
            .testimonial-proof-img { width: 100%; max-height: 140px; object-fit: cover; border-radius: 8px; border: 1px solid #222; }
            .review-form-box { background: #0e0e12; border: 1px solid #1a1a22; border-radius: 14px; padding: 16px; margin-top: 12px; }
            .review-input, .review-textarea { width: 100%; background: #14141c; border: 1px solid #22222e; border-radius: 8px; padding: 10px; color: #fff; font-size: 12px; margin-bottom: 10px; outline: none; }
            .review-input:focus, .review-textarea:focus { border-color: #38bdf8; box-shadow: 0 0 8px rgba(56,189,248,0.2); }
            .review-submit-btn { width: 100%; background: #38bdf8; color: #000; font-weight: 700; padding: 10px; border: none; border-radius: 8px; font-size: 12px; cursor: pointer; transition: 0.2s; }
            .review-submit-btn:hover { background: #0ea5e9; color: #fff; }
            .promo-box { background: #14141c; border: 1px solid #22222e; border-radius: 10px; padding: 10px; margin-bottom: 12px; display: flex; gap: 8px; }
            .promo-input { flex: 1; background: #0e0e12; border: 1px solid #262633; border-radius: 6px; padding: 8px 10px; color: #fff; font-size: 11px; outline: none; }
            .promo-btn { background: #1f2937; color: #38bdf8; border: 1px solid #374151; border-radius: 6px; padding: 8px 12px; font-size: 11px; font-weight: 700; cursor: pointer; }
            .promo-msg { font-size: 10px; margin-top: 4px; display: none; }
            .modal { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.88); backdrop-filter: blur(10px); z-index: 1000; justify-content: center; align-items: center; padding: 16px; }
            .modal.active { display: flex; }
            .modal-content { background: #0e0e12; border: 1px solid #22222e; width: 100%; max-width: 400px; border-radius: 24px; padding: 24px; text-align: center; position: relative; max-height: 92vh; overflow-y: auto; box-shadow: 0 15px 40px rgba(0,0,0,0.9); }
            .close-modal { position: absolute; top: 16px; right: 16px; background: #16161d; border: none; color: #888; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; }
            .social-link-item { display: block; width: 100%; padding: 12px; margin-top: 10px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 12px; text-align: center; color: #fff; border: 1px solid #22222e; background: #14141c; transition: 0.2s; }
            .social-link-item:hover { border-color: #38bdf8; background: #1c1c28; box-shadow: 0 0 10px rgba(56,189,248,0.2); }
            .view { display: none; padding: 0 0 20px 0; }
            .view.active { display: block; }
            .back-view-pad { padding: 20px; }
            .back-btn { background: #0e0e12; border: 1px solid #1a1a22; color: #fff; padding: 8px 14px; border-radius: 8px; cursor: pointer; margin-bottom: 20px; font-size: 12px; font-weight: 600; }
            .detail-box { background: #0e0e12; border: 1px solid #1a1a22; border-radius: 16px; padding: 20px; margin: 0 20px 16px 20px; }
            .benefit-list { list-style: none; padding: 0; margin: 10px 0 0 0; }
            .benefit-list li { font-size: 13px; color: #d4d4d4; margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
            .benefit-list li::before { content: '-'; color: #38bdf8; font-weight: bold; background: rgba(56,189,248,0.1); width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 11px; }
            .pay-btn { width: calc(100% - 40px); margin: 0 20px; background: #38bdf8; color: #000; font-weight: 700; padding: 14px; border: none; border-radius: 12px; font-size: 14px; cursor: pointer; text-align: center; transition: 0.2s; box-shadow: 0 0 15px rgba(56,189,248,0.4); }
            .pay-btn:hover { background: #0ea5e9; color: #fff; }
            .ewallet-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 14px 0; }
            .ewallet-btn { background: #14141c; border: 1px solid #22222e; color: #d4d4d4; padding: 12px; border-radius: 14px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; text-align: left; display: flex; align-items: center; gap: 10px; }
            .brand-badge { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: #fff; flex-shrink: 0; }
            .ewallet-btn.dana .brand-badge { background: #108ee9; }
            .ewallet-btn.dana.active { background: #0b5c9e; border-color: #108ee9; color: #fff; box-shadow: 0 0 12px rgba(16,142,233,0.3); }
            .ewallet-btn.gopay .brand-badge { background: #00aa13; }
            .ewallet-btn.gopay.active { background: #00660a; border-color: #00aa13; color: #fff; box-shadow: 0 0 12px rgba(0,170,19,0.3); }
            .ewallet-btn.ovo .brand-badge { background: #4c3494; }
            .ewallet-btn.ovo.active { background: #2c1c5c; border-color: #512da8; color: #fff; box-shadow: 0 0 12px rgba(76,52,148,0.3); }
            .ewallet-btn.shopeepay .brand-badge { background: #ee4d2d; }
            .ewallet-btn.shopeepay.active { background: #9e2d17; border-color: #d84315; color: #fff; box-shadow: 0 0 12px rgba(238,77,45,0.3); }
            .ewallet-btn:hover { border-color: #38bdf8; background: #1c1c28; }
            .qris-card-wrapper { background: #0e0e12; border: 1px solid #1a1a22; border-radius: 18px; padding: 14px; margin: 14px 0; display: none; box-shadow: 0 8px 25px rgba(0,0,0,0.6); }
            .qris-card-preview { width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid rgba(56, 189, 248, 0.4); background: #000; }
            .qris-card-preview img { width: 100%; height: auto; display: block; object-fit: contain; }
            .download-qr-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; width: 100%; background: #14141c; color: #38bdf8; border: 1px solid #22222e; font-weight: 600; padding: 10px; border-radius: 10px; font-size: 12px; margin-top: 10px; text-decoration: none; transition: 0.2s; }
            .download-qr-btn:hover { background: #1c1c28; color: #fff; }
            .success-pay-btn { width: 100%; background: #2563eb; color: #fff; border: none; font-weight: 700; padding: 14px; border-radius: 12px; margin-top: 12px; cursor: pointer; transition: 0.2s; display: none; box-shadow: 0 4px 15px rgba(37,99,235,0.3); }
            .success-pay-btn:hover { background: #1d4ed8; }
            .contact-option-btn { display: block; width: 100%; padding: 14px; margin-top: 10px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 13px; text-align: center; }
            .wa-option { background: #22c55e; color: #000; }
            .tg-option { background: #0284c7; color: #fff; }
        </style>
    </head>
    <body>
        <div class="app-container">
            <div id="home-view" class="view active">
                <header>
                    <div class="logo">KAZE <span>MARKET</span></div>
                    <button class="social-top-btn" onclick="openSocialModal()">Sosial Media</button>
                </header>
                <div class="banner-container">
                    <div class="welcome-banner">
                        <img src="banner.jpg" alt="Kaze Market Banner">
                        <div class="banner-light-center"></div>
                        <div class="energy-ray ray-1"></div>
                        <div class="energy-ray ray-2"></div>
                        <div class="energy-ray ray-3"></div>
                        <div class="energy-ray ray-4"></div>
                        <div class="wind-particle wp-1"></div>
                        <div class="wind-particle wp-2"></div>
                        <div class="wind-particle wp-3"></div>
                        <div class="wind-particle wp-4"></div>
                        <div class="wind-particle wp-5"></div>
                        <div class="wind-particle wp-6"></div>
                        <div class="banner-overlay">
                            <div class="banner-title">Kaze Market Official</div>
                            <div class="banner-subtitle">Pusat Layanan dan Akses Premium Terpercaya</div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="policy-banner">
                        <div class="policy-title">Layanan Digital Instan - Jaminan 100% Aman</div>
                        <p class="policy-desc">Tidak menerima pengiriman barang fisik. Proses digital langsung aktif dan dilindungi jaminan garansi uang kembali 100%.</p>
                    </div>
                    <div class="store-stats">
                        <div class="stat-box"><div class="stat-num">100%</div><div class="stat-label">Aman</div></div>
                        <div class="stat-box"><div class="stat-num">Instan</div><div class="stat-label">Proses</div></div>
                        <div class="stat-box"><div class="stat-num">1 Tahun</div><div class="stat-label">Garansi</div></div>
                    </div>
                    <div class="category-scroll" id="category-tabs"></div>
                    <div class="section-title">Katalog Produk</div>
                    <div id="product-list"></div>
                    <div class="section-title">Ulasan & Bukti Testimoni Pembeli</div>
                    <div id="testimonial-container">
                        <div class="empty-reviews" id="empty-review-notice">Belum ada ulasan atau pendapat dari pembeli saat ini. Jadilah yang pertama memberikan ulasan!</div>
                    </div>
                    <div class="review-form-box">
                        <div style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 8px;">Kirim Ulasan & Bukti Transaksi</div>
                        <input type="text" id="new-review-name" class="review-input" placeholder="Nama Lengkap">
                        <input type="text" id="new-review-proof" class="review-input" placeholder="URL Gambar Bukti (Opsional)">
                        <textarea id="new-review-text" class="review-textarea" rows="3" placeholder="Tulis ulasan produk disini..."></textarea>
                        <button class="review-submit-btn" onclick="addNewReview()">Kirim Ulasan</button>
                    </div>
                </div>
            </div>
            <div id="detail-view" class="view">
                <div class="back-view-pad"><button class="back-btn" onclick="goHome()">Kembali</button></div>
                <div class="detail-box">
                    <div id="detail-tag" class="tag"></div>
                    <h2 id="detail-title" style="margin: 8px 0 6px 0; color:#fff; font-size: 18px;"></h2>
                    <p id="detail-desc" style="font-size: 12px; color: #888; line-height: 1.5; margin: 0;"></p>
                </div>
                <div class="detail-box">
                    <div style="font-size: 12px; font-weight: 700; color: #737373; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Harga dan Layanan</div>
                    <div style="background: #14141c; border: 1px solid #22222e; padding: 12px 16px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <span id="detail-price-name" style="font-size: 11px; color: #38bdf8; display: block; font-weight: 600;"></span>
                            <b id="detail-price" style="font-size: 18px; color: #fff;"></b>
                        </div>
                        <span style="color: #38bdf8; font-size: 14px; font-weight: bold;">Aktif</span>
                    </div>
                </div>
                <div class="detail-box">
                    <div style="font-size: 12px; font-weight: 700; color: #737373; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Benefit Produk</div>
                    <ul id="detail-benefits" class="benefit-list"></ul>
                </div>
                <button class="pay-btn" onclick="openQrisModal()">Lanjut Pembayaran</button>
            </div>
            <div id="social-modal" class="modal">
                <div class="modal-content">
                    <button class="close-modal" onclick="closeSocialModal()">X</button>
                    <h3 style="margin: 0 0 4px 0; font-size: 16px; color: #fff;">Sosial Media Resmi</h3>
                    <p style="font-size: 11px; color: #888; margin-bottom: 16px;">Hubungi kami melalui tautan resmi di bawah ini:</p>
                    <div id="social-links-container">
                        ${data.socialLinks.map(s => `<a href="${s.url}" target="_blank" class="social-link-item">${s.name}</a>`).join('')}
                    </div>
                </div>
            </div>
            <div id="qris-modal" class="modal">
                <div class="modal-content">
                    <button class="close-modal" onclick="closeQrisModal()">X</button>
                    <div id="payment-step-1">
                        <h3 style="margin:0 0 4px 0; font-size:16px; color:#fff;">Pilih E-Wallet Pembayaran</h3>
                        <div style="font-size:11px; color:#888; margin-bottom: 10px;">Ketuk metode pembayaran pilihanmu:</div>
                        <div class="promo-box">
                            <input type="text" id="promo-code-input" class="promo-input" placeholder="Masukkan Kode Kupon (Contoh: KAZE)">
                            <button class="promo-btn" onclick="applyPromo()">Gunakan</button>
                        </div>
                        <div id="promo-message" class="promo-msg"></div>
                        <div class="ewallet-grid">
                            <button class="ewallet-btn dana" onclick="selectEwallet('DANA', this)"><div class="brand-badge">DA</div><span>DANA</span></button>
                            <button class="ewallet-btn gopay" onclick="selectEwallet('GoPay', this)"><div class="brand-badge">GP</div><span>GoPay</span></button>
                            <button class="ewallet-btn ovo" onclick="selectEwallet('OVO', this)"><div class="brand-badge">OV</div><span>OVO</span></button>
                            <button class="ewallet-btn shopeepay" onclick="selectEwallet('ShopeePay', this)"><div class="brand-badge">SP</div><span>ShopeePay</span></button>
                        </div>
                        <div class="qris-card-wrapper" id="qris-card-wrapper">
                            <div style="font-size: 12px; color: #38bdf8; font-weight: 700; margin-bottom: 10px;" id="selected-ewallet-text"></div>
                            <div class="qris-card-preview">
                                <img src="${data.qrisImage}" alt="QRIS Kaze Market" onerror="this.src='https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=QRIS_NOT_FOUND'">
                            </div>
                            <a href="${data.qrisImage}" download="QRIS_KazeMarket.jpg" class="download-qr-btn">Unduh Gambar QRIS</a>
                            <div style="margin: 12px 0 4px 0;">
                                <span style="font-size: 11px; color: #888;">Total Pembayaran</span>
                                <div style="font-size: 20px; font-weight: 800; color: #38bdf8;" id="modal-total-price">Rp 0</div>
                            </div>
                        </div>
                        <button class="success-pay-btn" id="success-btn" onclick="goToStep2()">Saya Sudah Bayar</button>
                    </div>
                    <div id="payment-step-2" style="display: none;">
                        <h3 style="margin: 0 0 6px 0; font-size: 16px; color: #fff;">Pilih Saluran Konfirmasi</h3>
                        <p style="font-size: 12px; color: #888; margin-bottom: 20px; line-height: 1.4;">Kirim bukti pembayaran ke Admin Kaze Market untuk memproses pesananmu.</p>
                        <a id="wa-link-btn" href="#" target="_blank" class="contact-option-btn wa-option">Konfirmasi via WhatsApp</a>
                        <a id="tg-link-btn" href="#" target="_blank" class="contact-option-btn tg-option">Konfirmasi via Telegram</a>
                        <button onclick="backToStep1()" style="background:none; border:none; color:#737373; font-size:11px; margin-top:16px; cursor:pointer; font-weight:600;">Kembali</button>
                    </div>
                </div>
            </div>
        </div>
        <script>
            const products = ${JSON.stringify(data.products)};
            const categories = ${JSON.stringify(data.categories)};
            const telegramUser = "${data.telegramUsername}";
            const whatsappNumber = "${data.whatsappNumber}";
            let selectedProduct = null;
            let chosenEwallet = "";
            let currentCategory = "Semua Produk";
            let activeDiscount = 0;
            function renderCategories() {
                const tabContainer = document.getElementById('category-tabs');
                tabContainer.innerHTML = "";
                categories.forEach(cat => {
                    const btn = document.createElement('button');
                    btn.className = 'category-tab ' + (cat === currentCategory ? 'active' : '');
                    btn.innerText = cat;
                    btn.onclick = () => { currentCategory = cat; renderCategories(); renderProducts(); };
                    tabContainer.appendChild(btn);
                });
            }
            function renderProducts() {
                const list = document.getElementById('product-list');
                list.innerHTML = "";
                const filtered = currentCategory === "Semua Produk" ? products : products.filter(p => p.category === currentCategory);
                if(filtered.length === 0) { list.innerHTML = '<div style="text-align:center; color:#737373; font-size:12px; padding:20px;">Belum ada produk dalam kategori ini.</div>'; return; }
                filtered.forEach(p => {
                    list.innerHTML += \`
                        <div class="product-card" onclick="showDetail('\${p.id}')">
                            <span class="tag">\${p.tag}</span>
                            <div class="product-title">\${p.title}</div>
                            <div class="product-desc">\${p.shortDesc}</div>
                            <div class="product-footer">
                                <span class="price">\${p.price}</span>
                                <span class="detail-link">Lihat Detail -></span>
                            </div>
                        </div>
                    \`;
                });
            }
            function showDetail(id) {
                selectedProduct = products.find(p => p.id === id);
                if(!selectedProduct) return;
                document.getElementById('detail-tag').innerText = selectedProduct.tag;
                document.getElementById('detail-title').innerText = selectedProduct.title;
                document.getElementById('detail-desc').innerText = selectedProduct.fullDesc;
                document.getElementById('detail-price-name').innerText = selectedProduct.priceName;
                document.getElementById('detail-price').innerText = selectedProduct.price;
                document.getElementById('modal-total-price').innerText = selectedProduct.price;
                const bList = document.getElementById('detail-benefits');
                bList.innerHTML = "";
                selectedProduct.benefits.forEach(b => { bList.innerHTML += \`<li>\${b}</li>\`; });
                document.getElementById('home-view').classList.remove('active');
                document.getElementById('detail-view').classList.add('active');
                window.scrollTo(0,0);
            }
            function goHome() {
                document.getElementById('detail-view').classList.remove('active');
                document.getElementById('home-view').classList.add('active');
            }
            function openSocialModal() { document.getElementById('social-modal').classList.add('active'); }
            function closeSocialModal() { document.getElementById('social-modal').classList.remove('active'); }
            function applyPromo() {
                const code = document.getElementById('promo-code-input').value.trim().toUpperCase();
                const msg = document.getElementById('promo-message');
                msg.style.display = 'block';
                if(code === "KAZE" || code === "KAZE2026") {
                    activeDiscount = 200;
                    msg.style.color = "#38bdf8";
                    msg.innerText = "Kupon berhasil digunakan! Potongan harga diterapkan.";
                    if(selectedProduct) { document.getElementById('modal-total-price').innerText = "Rp 800 (Diskon Kupon)"; }
                } else {
                    activeDiscount = 0;
                    msg.style.color = "#ef4444";
                    msg.innerText = "Kode kupon tidak valid atau sudah kedaluwarsa.";
                    if(selectedProduct) { document.getElementById('modal-total-price').innerText = selectedProduct.price; }
                }
            }
            function addNewReview() {
                const nameInput = document.getElementById('new-review-name');
                const textInput = document.getElementById('new-review-text');
                const proofInput = document.getElementById('new-review-proof');
                const container = document.getElementById('testimonial-container');
                const emptyNotice = document.getElementById('empty-review-notice');
                if(!nameInput.value || !textInput.value) { alert('Harap isi nama dan ulasan terlebih dahulu.'); return; }
                if(emptyNotice) { emptyNotice.remove(); }
                const newCard = document.createElement('div');
                newCard.className = 'testimonial-card';
                newCard.innerHTML = \`
                    <div class="testimonial-header">
                        <span class="testimonial-name">\${nameInput.value}</span>
                        <span class="testimonial-stars">5.0 / 5.0</span>
                    </div>
                    <p class="testimonial-text">\${textInput.value}</p>
                    \${proofInput.value ? '<img src="' + proofInput.value + '" alt="Bukti Testimoni" class="testimonial-proof-img">' : ''}
                \`;
                container.prepend(newCard);
                nameInput.value = ''; textInput.value = ''; proofInput.value = '';
            }
            function openQrisModal() {
                document.querySelectorAll('.ewallet-btn').forEach(btn => btn.classList.remove('active'));
                document.getElementById('qris-card-wrapper').style.display = 'none';
                document.getElementById('success-btn').style.display = 'none';
                document.getElementById('promo-code-input').value = '';
                document.getElementById('promo-message').style.display = 'none';
                document.getElementById('payment-step-1').style.display = 'block';
                document.getElementById('payment-step-2').style.display = 'none';
                document.getElementById('qris-modal').classList.add('active');
            }
            function closeQrisModal() { document.getElementById('qris-modal').classList.remove('active'); }
            function selectEwallet(name, element) {
                chosenEwallet = name;
                document.querySelectorAll('.ewallet-btn').forEach(btn => btn.classList.remove('active'));
                element.classList.add('active');
                document.getElementById('qris-card-wrapper').style.display = 'block';
                document.getElementById('success-btn').style.display = 'block';
                document.getElementById('selected-ewallet-text').innerText = "Bayar via " + name + " (Scan QRIS)";
            }
            function goToStep2() {
                if(!selectedProduct) return;
                const finalPriceText = activeDiscount > 0 ? "Rp 800 (Setelah Kupon)" : selectedProduct.price;
                const textMsg = encodeURIComponent("Halo Kaze Market, saya sudah melakukan pembayaran via " + chosenEwallet + " untuk produk *" + selectedProduct.title + "* seharga *" + finalPriceText + "*. Berikut bukti pembayarannya:");
                document.getElementById('wa-link-btn').href = "https://wa.me/" + whatsappNumber + "?text=" + textMsg;
                document.getElementById('tg-link-btn').href = "https://t.me/" + telegramUser + "?text=" + textMsg;
                document.getElementById('payment-step-1').style.display = 'none';
                document.getElementById('payment-step-2').style.display = 'block';
            }
            function backToStep1() {
                document.getElementById('payment-step-2').style.display = 'none';
                document.getElementById('payment-step-1').style.display = 'block';
            }
            renderCategories();
            renderProducts();
        </script>
    </body>
    </html>
    `;
    res.send(html);
});

app.listen(PORT, () => {
    console.log("KAZE MARKET (WEB) Berjalan di http://localhost:" + PORT);
});
