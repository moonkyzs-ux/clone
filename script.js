
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || JSON.parse(localStorage.getItem('cartItem')) || [
    {
        id: 1,
        name: 'Elden Ring: Shadow of the Erdtree',
        price: 500000,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        name: 'Cyberpunk 2077',
        price: 299000,
        qty: 2,
        image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=800&q=80'
    }
];


let wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

let discount = 0;


function saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}


function saveWishlist() {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
}

function formatRupiah(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(value);
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const itemCount = document.getElementById('item-count');

    if (!container) return;

    if (cartItems.length === 0) {
        container.innerHTML = '<div class="empty-state">Keranjang Anda masih kosong. Yuk mulai belanja!</div>';
        itemCount.textContent = '0 produk';
        updateSummary();
        return;
    }

    const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
    itemCount.textContent = `${totalQty} produk`;

    container.innerHTML = '';

    cartItems.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'cart-item';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <div class="item-title">${item.name}</div>
                <div class="item-price">${formatRupiah(item.price)}</div>
                <div class="item-price">Subtotal: ${formatRupiah(item.price * item.qty)}</div>
                <div class="qty-box">
                    <button class="qty-btn" data-action="decrease" data-id="${item.id}">−</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
                    <button class="qty-btn remove" data-action="remove" data-id="${item.id}">−</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    updateSummary();
}

function updateSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const total = Math.max(subtotal - discount, 0);

    document.getElementById('subtotal').textContent = formatRupiah(subtotal);
    document.getElementById('discount').textContent = formatRupiah(discount);
    document.getElementById('total').textContent = formatRupiah(total);
}

function changeQty(id, delta) {
    const item = cartItems.find((entry) => String(entry.id) === String(id));
    if (!item) return;

    item.qty = Math.max(1, item.qty + delta);
    saveCart();
    renderCart();
}

function removeItem(id) {
    const index = cartItems.findIndex((item) => String(item.id) === String(id));
    if (index !== -1) {
        cartItems.splice(index, 1);
        saveCart();
        renderCart();
    }
}


function addToCart(id, name, price, image) {
    const existingItem = cartItems.find((item) => String(item.id) === String(id) || item.name === name);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cartItems.push({
            id: id,
            name: name,
            price: price,
            qty: 1,
            image: image
        });
    }
    
    saveCart();
    showNotification(`${name} ditambahkan ke keranjang!`);
}


function buyEldenRingShadowOfTheErdtree() {
    const gameId = 'elden-ring-shadow-of-the-erdtree';
    const gameName = 'Elden Ring: Shadow of the Erdtree';
    const gamePrice = 899000;
    const gameImage = 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXUzYm5xNDQ4dW82Z2s0aGp4MXR0cGR1bmV5b3R3eGlic3J2bmkybiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/o4FQwsg7CmI6SjE49c/giphy.gif';
    
    addToCart(gameId, gameName, gamePrice, gameImage);
    
    setTimeout(() => {
        window.location.href = 'keranjang.html';
    }, 800);
}

function buyHades() {
    const gameId = 'Hades';
    const gameName = 'Hades';
    const gamePrice = 449000;
    const gameImage = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHRkazE3Z3IxcXA4NDZ3YmVoMXMxMmRscjd6dnZvZ25icnRvNnZhbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kMWcOxlEVNV2t1QDUS/giphy.gif';
    
    addToCart(gameId, gameName, gamePrice, gameImage);
    
    setTimeout(() => {
        window.location.href = 'keranjang.html';
    }, 800);
}


function buyCyberpunk2077() {
    const gameId = 'Cyberpunk-2077';
    const gameName = 'Cyberpunk 2077';
    const gamePrice = 541614;
    const gameImage = 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmtjMG5scWM0bDA2d2N5MzEwODlybGt3aWJmemwzZXc2ZGc2NzZiMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pylNZOmEWUMwGXdzQj/giphy.gif';
    
    addToCart(gameId, gameName, gamePrice, gameImage);
    
    setTimeout(() => {
        window.location.href = 'keranjang.html';
    }, 800);
}

function buyTheWitcher3WildHunt() {
    const gameId = 'The Witcher-3-Wild-Hunt';
    const gameName = 'The Witcher 3: Wild Hunt';
    const gamePrice = 541614;
    const gameImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSkA3Q1OAfTNRMaorh8xERsfxQhoqv6HXOW6vb2vbCraQFLtH2yBaEEgo&s=10';
    
    addToCart(gameId, gameName, gamePrice, gameImage);
    
    setTimeout(() => {
        window.location.href = 'keranjang.html';
    }, 800);
}

function buyEldenRing() {
    const gameId = 'Elden Ring';
    const gameName = 'Elden Ring';
    const gamePrice = 541614;
    const gameImage = 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN25rOXBheGc0cWlpb21uN2l6bjA2MTFjZ3gzbmhkOTY2cHRjNWJtMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7TNg7uZ1FDk8iFIyMr/giphy.gif';
    
    addToCart(gameId, gameName, gamePrice, gameImage);
    
    setTimeout(() => {
        window.location.href = 'keranjang.html';
    }, 800);
}

function buyBaldursGate3() {
    const gameId = 'Baldurs-Gate-3';
    const gameName = 'Baldur\'s Gate 3';
    const gamePrice = 87000;
    const gameImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg5CuhI1qlXo56oBR921AyUDfrlpJedgOofktTCczL4J_n9-vMBTBiMVOx&s=10';
    
    addToCart(gameId, gameName, gamePrice, gameImage);
    
    setTimeout(() => {
        window.location.href = 'keranjang.html';
    }, 800);
}

function buyItTakesTwo() {
    const gameId = 'It-Takes-Two';
    const gameName = 'It Takes Two';
    const gamePrice = 479000;
    const gameImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiIXD1ZkWJdG2cAwXYAf2d1lWWyt1Jz25PTTkQwmvd7A&s=10';
    
    addToCart(gameId, gameName, gamePrice, gameImage);
    
    setTimeout(() => {
        window.location.href = 'keranjang.html';
    }, 800);
}

function addWishlistEldenRingShadowOfTheErdtree() {
    const gameId = 'elden-ring-shadow-of-the-erdtree';
    const gameName = 'Elden Ring: Shadow of the Erdtree';
    const gamePrice = 899000;
    const gameImage = 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXUzYm5xNDQ4dW82Z2s0aGp4MXR0cGR1bmV5b3R3eGlic3J2bmkybiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/o4FQwsg7CmI6SjE49c/giphy.gif';
    
    const existingItem = wishlistItems.find((item) => item.id === gameId || item.name === gameName);
    
    if (existingItem) {
        showNotification('Produk sudah ada di wishlist!', 'warning');
        return;
    }
    
    wishlistItems.push({
        id: gameId,
        name: gameName,
        price: gamePrice,
        image: gameImage,
        addedDate: new Date().toLocaleDateString('id-ID')
    });
    
    saveWishlist();
    showNotification(`${gameName} ditambahkan ke wishlist!`);
    
    if (window.location.pathname.toLowerCase().includes('wishlist.html')) {
        renderWishlist();
    } else {
        setTimeout(() => {
            window.location.href = 'wishlist.html';
        }, 800);
    }
    
    updateWishlistButtonUI();
}

function addWishlistHades() {
    const gameId = 'Hades';
    const gameName = 'Hades';
    const gamePrice = 449000;
    const gameImage = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHRkazE3Z3IxcXA4NDZ3YmVoMXMxMmRscjd6dnZvZ25icnRvNnZhbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kMWcOxlEVNV2t1QDUS/giphy.gif';
    
    const existingItem = wishlistItems.find((item) => item.id === gameId || item.name === gameName);
    
    if (existingItem) {
        showNotification('Produk sudah ada di wishlist!', 'warning');
        return;
    }
    
    wishlistItems.push({
        id: gameId,
        name: gameName,
        price: gamePrice,
        image: gameImage,
        addedDate: new Date().toLocaleDateString('id-ID')
    });
    
    saveWishlist();
    showNotification(`${gameName} ditambahkan ke wishlist!`);
    
    if (window.location.pathname.toLowerCase().includes('wishlist.html')) {
        renderWishlist();
    } else {
        setTimeout(() => {
            window.location.href = 'wishlist.html';
        }, 800);
    }
    
    updateWishlistButtonUI();
}

function addWishlistCyberpunk2077() {
    const gameId = 'Cyberpunk-2077';
    const gameName = 'Cyberpunk 2077';
    const gamePrice = 541614;
    const gameImage = 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmtjMG5scWM0bDA2d2N5MzEwODlybGt3aWJmemwzZXc2ZGc2NzZiMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pylNZOmEWUMwGXdzQj/giphy.gif';
    
    const existingItem = wishlistItems.find((item) => item.id === gameId || item.name === gameName);
    
    if (existingItem) {
        showNotification('Produk sudah ada di wishlist!', 'warning');
        return;
    }
    
    wishlistItems.push({
        id: gameId,
        name: gameName,
        price: gamePrice,
        image: gameImage,
        addedDate: new Date().toLocaleDateString('id-ID')
    });
    
    saveWishlist();
    showNotification(`${gameName} ditambahkan ke wishlist!`);
    
    if (window.location.pathname.toLowerCase().includes('wishlist.html')) {
        renderWishlist();
    } else {
        setTimeout(() => {
            window.location.href = 'wishlist.html';
        }, 800);
    }
    
    updateWishlistButtonUI();
}

function addWishlistTheWitcher3WildHunt() {
    const gameId = 'The Witcher-3-Wild-Hunt';
    const gameName = 'The Witcher 3: Wild Hunt';
    const gamePrice = 449000;
    const gameImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSkA3Q1OAfTNRMaorh8xERsfxQhoqv6HXOW6vb2vbCraQFLtH2yBaEEgo&s=10';
    
    const existingItem = wishlistItems.find((item) => item.id === gameId || item.name === gameName);
    
    if (existingItem) {
        showNotification('Produk sudah ada di wishlist!', 'warning');
        return;
    }
    
    wishlistItems.push({
        id: gameId,
        name: gameName,
        price: gamePrice,
        image: gameImage,
        addedDate: new Date().toLocaleDateString('id-ID')
    });
    
    saveWishlist();
    showNotification(`${gameName} ditambahkan ke wishlist!`);
    
    if (window.location.pathname.toLowerCase().includes('wishlist.html')) {
        renderWishlist();
    } else {
        setTimeout(() => {
            window.location.href = 'wishlist.html';
        }, 800);
    }
    
    updateWishlistButtonUI();
}


function addWishlistEldenRing() {
    const gameId = 'Elden-Ring';
    const gameName = 'Elden Ring';
    const gamePrice = 541614;
    const gameImage = 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExN25rOXBheGc0cWlpb21uN2l6bjA2MTFjZ3gzbmhkOTY2cHRjNWJtMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7TNg7uZ1FDk8iFIyMr/giphy.gif';
    
    const existingItem = wishlistItems.find((item) => item.id === gameId || item.name === gameName);
    
    if (existingItem) {
        showNotification('Produk sudah ada di wishlist!', 'warning');
        return;
    }
    
    wishlistItems.push({
        id: gameId,
        name: gameName,
        price: gamePrice,
        image: gameImage,
        addedDate: new Date().toLocaleDateString('id-ID')
    });
    
    saveWishlist();
    showNotification(`${gameName} ditambahkan ke wishlist!`);
    
    if (window.location.pathname.toLowerCase().includes('wishlist.html')) {
        renderWishlist();
    } else {
        setTimeout(() => {
            window.location.href = 'wishlist.html';
        }, 800);
    }
    
    updateWishlistButtonUI();
}


function addWishlistBaldursGate3() {
    const gameId = 'Baldurs-Gate-3';
    const gameName = 'Baldurs Gate 3';
    const gamePrice = 87000;
    const gameImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg5CuhI1qlXo56oBR921AyUDfrlpJedgOofktTCczL4J_n9-vMBTBiMVOx&s=10';
    
    const existingItem = wishlistItems.find((item) => item.id === gameId || item.name === gameName);
    
    if (existingItem) {
        showNotification('Produk sudah ada di wishlist!', 'warning');
        return;
    }
    
    wishlistItems.push({
        id: gameId,
        name: gameName,
        price: gamePrice,
        image: gameImage,
        addedDate: new Date().toLocaleDateString('id-ID')
    });
    
    saveWishlist();
    showNotification(`${gameName} ditambahkan ke wishlist!`);
    
    if (window.location.pathname.toLowerCase().includes('wishlist.html')) {
        renderWishlist();
    } else {
        setTimeout(() => {
            window.location.href = 'wishlist.html';
        }, 800);
    }
    
    updateWishlistButtonUI();
}

function addWishlistItTakesTwo() {
    const gameId = 'It-Takes-Two';
    const gameName = 'It Takes Two';
    const gamePrice = 479000;
    const gameImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiIXD1ZkWJdG2cAwXYAf2d1lWWyt1Jz25PTTkQwmvd7A&s=10';
    
    const existingItem = wishlistItems.find((item) => item.id === gameId || item.name === gameName);
    
    if (existingItem) {
        showNotification('Produk sudah ada di wishlist!', 'warning');
        return;
    }
    
    wishlistItems.push({
        id: gameId,
        name: gameName,
        price: gamePrice,
        image: gameImage,
        addedDate: new Date().toLocaleDateString('id-ID')
    });
    
    saveWishlist();
    showNotification(`${gameName} ditambahkan ke wishlist!`);
    
    if (window.location.pathname.toLowerCase().includes('wishlist.html')) {
        renderWishlist();
    } else {
        setTimeout(() => {
            window.location.href = 'wishlist.html';
        }, 800);
    }
    
    updateWishlistButtonUI();
}

function removeFromWishlist(id) {
    const index = wishlistItems.findIndex((item) => item.id === id);
    if (index !== -1) {
        wishlistItems.splice(index, 1);
        saveWishlist();
        renderWishlist();
        showNotification('Dihapus dari wishlist');
    }
}


function showNotification(message, type = 'success') {
    
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        document.body.appendChild(notification);
        
        
        if (!document.getElementById('notification-style')) {
            const style = document.createElement('style');
            style.id = 'notification-style';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    notification.textContent = message;
    notification.style.backgroundColor = type === 'warning' ? '#ff9800' : '#4caf50';
    notification.style.color = 'white';
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}


function updateWishlistButtonUI() {
    const wishlistBtn = document.querySelector('[onclick="addWishlist()"]');
    if (wishlistBtn) {
        wishlistBtn.style.opacity = '0.6';
        setTimeout(() => {
            wishlistBtn.style.opacity = '1';
        }, 500);
    }
}


function renderWishlist() {
    const container = document.getElementById('wishlist-items');
    if (!container) return;
    
    if (wishlistItems.length === 0) {
        container.innerHTML = '<div class="empty-state">Wishlist Anda masih kosong.</div>';
        return;
    }
    container.innerHTML = '';
    
    wishlistItems.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'wishlist-item';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1; margin-left: 12px;">
                <div class="game-title">${item.name}</div>
                <div class="game-price">${formatRupiah(item.price)}</div>
                <p class="item-detail">Ditambahkan ${item.addedDate}</p>
                <button class="btn btn-sm btn-primary" onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}'); removeFromWishlist('${item.id}');">Pindah ke Keranjang</button>
                <button class="btn btn-sm btn-danger" onclick="removeFromWishlist('${item.id}');">Hapus</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function applyPromo() {
    const code = document.getElementById('promoCode').value.trim().toUpperCase();

    if (code === 'TRISTANGTG15') {
        discount = 200000000;
    } else {
        discount = 0;
    }

    updateSummary();
}

function handleCheckout() {
    if (!cartItems.length) {
        showNotification('Keranjang masih kosong. Tambahkan produk dulu.', 'warning');
        return;
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const total = Math.max(subtotal - discount, 0);
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;

    const pendingOrder = {
        id: orderId,
        items: cartItems.map((item) => ({ ...item })),
        subtotal,
        discount,
        total,
        createdAt: new Date().toLocaleString('id-ID')
    };

    localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));
    window.location.href = 'payment.html';
}

function finalizeCheckout(paymentMethod = 'Transfer Bank') {
    const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder') || 'null');

    if (!pendingOrder) {
        showNotification('Tidak ada pesanan yang menunggu. Silakan ulangi checkout.', 'warning');
        return;
    }

    const order = {
        ...pendingOrder,
        paymentMethod,
        status: 'Diproses'
    };

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('lastOrder', JSON.stringify(order));
    localStorage.removeItem('pendingOrder');
    localStorage.setItem('selectedPaymentMethod', paymentMethod);

    cartItems = [];
    saveCart();
    renderCart();
    showNotification(`Checkout berhasil! Pesanan ${order.id} sedang diproses.`, 'success');

    setTimeout(() => {
        window.location.href = `beli.html?status=checkout&orderId=${order.id}&payment=${encodeURIComponent(paymentMethod)}`;
    }, 800);
}

document.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const action = button.getAttribute('data-action');
    const id = button.getAttribute('data-id');

    if (action === 'increase') {
        changeQty(id, 1);
    } else if (action === 'decrease') {
        changeQty(id, -1);
    } else if (action === 'remove') {
        removeItem(id);
    }
});

document.getElementById('applyPromo')?.addEventListener('click', applyPromo);
document.getElementById('checkoutBtn')?.addEventListener('click', handleCheckout);

renderCart();
renderWishlist();
