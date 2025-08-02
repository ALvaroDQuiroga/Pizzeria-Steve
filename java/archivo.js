document.addEventListener('DOMContentLoaded', function() {
    let cart = [];

    // Actualiza el carrito en el DOM
    function updateCart() {
        const cartItemsEl = document.getElementById('cart-items');
        const cartTotalEl = document.getElementById('cart-total');
        const nextButton = document.getElementById('next-to-step2');
        if (cart.length === 0) {
            cartItemsEl.innerHTML = '<p class="text-gray-500 italic">Agrega productos desde el menú</p>';
            nextButton.disabled = true;
            cartTotalEl.textContent = '$';
        } else {
            cartItemsEl.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                total += parseFloat(item.price) * item.qty;
                const div = document.createElement('div');
                div.className = 'flex justify-between items-center mb-2';
                div.innerHTML = `
                    <span>${item.name} x${item.qty}</span>
                    <span>AR$${(item.price * item.qty).toFixed(2)}</span>
                    <button class="ml-2 text-red-600 font-bold remove-item" data-index="${index}">✕</button>
                `;
                cartItemsEl.appendChild(div);
            });
            cartTotalEl.textContent = `$${total.toFixed(2)}`;
            nextButton.disabled = false;
        }
    }

    // Eliminar del carrito
    document.getElementById('cart-items').addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const idx = parseInt(e.target.getAttribute('data-index'));
            cart.splice(idx, 1);
            updateCart();
        }
    });

    // Paso 1 → Paso 2
    document.getElementById('next-to-step2').addEventListener('click', function() {
        document.getElementById('step1').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
    });

    // Paso 2 → Paso 1
    document.getElementById('back-to-step1').addEventListener('click', function() {
        document.getElementById('step2').classList.add('hidden');
        document.getElementById('step1').classList.remove('hidden');
    });

// Paso 2 → Paso 3
document.getElementById('next-to-step3').addEventListener('click', function() {
    // Recoge los datos del formulario
    const inputs = document.querySelectorAll('#step2 input');
    const metodoPago = document.getElementById('metodo-pago').value;
    let valid = true;
    inputs.forEach(input => {
        if (input.value.trim() === '' && input.type !== 'text') valid = false;
    });
    // Validar método de pago
    if (!metodoPago) {
        valid = false;
    }
    if (!valid) {
        alert('Por favor, completa todos los campos obligatorios y selecciona un método de pago.');
        return;
    }
    // Muestra resumen de pedido
    const summaryItems = document.getElementById('order-summary-items');
    summaryItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'flex justify-between mb-1';
        div.innerHTML = `<span>${item.name} x${item.qty}</span><span>AR$${(item.price * item.qty).toFixed(2)}</span>`;
        summaryItems.appendChild(div);
    });
    document.getElementById('order-summary-total').textContent = `AR$${total.toFixed(2)}`;
    // Muestra datos de entrega
    const details = document.getElementById('order-summary-details');
    details.innerHTML = `
        <div><strong>Nombre:</strong> ${inputs[0].value}</div>
        <div><strong>Teléfono:</strong> ${inputs[1].value}</div>
        <div><strong>Dirección:</strong> ${inputs[2].value}</div>
        <div><strong>Comentarios:</strong> ${inputs[3].value}</div>
        <div><strong>Método de pago:</strong> ${metodoPago}</div>
    `;
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.remove('hidden');
});

    // Paso 3 → Paso 2
    document.getElementById('back-to-step2').addEventListener('click', function() {
        document.getElementById('step3').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
    });

    // Confirmar pedido (WhatsApp)
    document.getElementById('place-order').addEventListener('click', function() {
        // Recoge los datos del cliente
        const inputs = document.querySelectorAll('#step2 input');
        const nombre = inputs[0].value;
        const telefono = inputs[1].value;
        const direccion = inputs[2].value;
        const comentarios = inputs[3].value;

        // Construye el resumen del pedido
        let mensaje = `¡Hola! Quiero hacer un pedido en Pizza Steve:%0A`;
        mensaje += `*Nombre:* ${nombre}%0A`;
        mensaje += `*Teléfono:* ${telefono}%0A`;
        mensaje += `*Dirección:* ${direccion}%0A`;
        mensaje += `*Comentarios:* ${comentarios}%0A%0A`;
        mensaje += `*Pedido:*%0A`;
        let total = 0;
        cart.forEach(item => {
            mensaje += `- ${item.name} x${item.qty} (AR$${(item.price * item.qty).toFixed(2)})%0A`;
            total += item.price * item.qty;
        });
        mensaje += `%0A*Total:* $${total.toFixed(2)}`;

        // Tu número de WhatsApp (pon tu número real aquí, con código de país, sin + ni espacios)
        const numero = "5401134106071"; // Ejemplo: 5401112345678 para argentina

        // Abre WhatsApp con el mensaje
        window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');

        // Limpia el carrito y vuelve al paso 1
        cart = [];
        updateCart();
        document.getElementById('step3').classList.add('hidden');
        document.getElementById('step1').classList.remove('hidden');
        document.querySelectorAll('#step2 input').forEach(input => input.value = '');
    });

    // --- MENÚ POR CATEGORÍAS ---
    const productos = [
        // PIZZAS
        { categoria: "pizzas", nombre: "Steve Crazy", precio: 12.99, img: "https://i.imgur.com/H8Rhjx5.png", desc: "Pepperoni, champiñones, pimientos y mucha personalidad" },
        { categoria: "pizzas", nombre: "Grandpa Special", precio: 14.99, img: "https://i.imgur.com/SD3JUCo.png", desc: "Todo lo que encuentres en la nevera, ¡pero sorprendentemente delicioso!" },
        { categoria: "pizzas", nombre: "Cool Dude", precio: 13.99, img: "https://i.imgur.com/bRvPF5z.png", desc: "Doble queso, bacon crujiente y actitud desenfadada" },
        { categoria: "pizzas", nombre: "Belly Monster", precio: 16.99, img: "https://i.imgur.com/cUuUjDL.png", desc: "Cuádruple carne, queso extra y salsa secreta" },
        { categoria: "pizzas", nombre: "Tiny Miracle", precio: 10.99, img: "https://i.imgur.com/Slkqtlq.png", desc: "Margarita clásica pero con el toque Steve" },
        { categoria: "pizzas", nombre: "Hot Stuff", precio: 13.49, img: "https://i.imgur.com/uChOKFX.png", desc: "Jalapeños, chili y mucho carácter" },
        // HAMBURGUESAS
        { categoria: "hamburguesas", nombre: "Hamburguesa Doble", precio: 10.00, img: "https://okdiario.com/img/2021/12/09/hamburguesas-caseras-rellenas-de-queso-cheddar-655x368.jpg", desc: "Doble carne, queso cheddar y pan artesanal" },
        { categoria: "hamburguesas", nombre: "Hamburguesa Clásica", precio: 8.50, img: "https://i.imgur.com/4QfKuz1.jpg", desc: "Carne, lechuga, tomate y mayonesa" },
        // MILANESAS
        { categoria: "milanesas", nombre: "Milanesa Napolitana", precio: 9.50, img: "https://i.imgur.com/7y3bQ2v.jpg", desc: "Con salsa, jamón y queso" },
        { categoria: "milanesas", nombre: "Milanesa Clásica", precio: 8.00, img: "https://i.imgur.com/8y3bQ2v.jpg", desc: "Milanesa de carne con papas" },
        // SANGUCHES
        { categoria: "sanguches", nombre: "Sanguche de Lomito", precio: 8.00, img: "https://i.imgur.com/9y3bQ2v.jpg", desc: "Lomo, lechuga, tomate y mayonesa" },
        { categoria: "sanguches", nombre: "Sanguche de Milanesa", precio: 7.50, img: "https://i.imgur.com/0y3bQ2v.jpg", desc: "Milanesa, tomate, lechuga y huevo" },
        // PAPAS
        { categoria: "papas", nombre: "Papas Fritas", precio: 5.00, img: "https://i.imgur.com/1y3bQ2v.jpg", desc: "Crocantes y doradas" },
        { categoria: "papas", nombre: "Papas con Cheddar", precio: 6.50, img: "https://i.imgur.com/2y3bQ2v.jpg", desc: "Papas fritas con salsa cheddar y bacon" },
        //COMBO y PROMOS
        { categoria: "combo", nombre: "Combo Familiar", precio: 25.00, img: "https://i.imgur.com/3y3bQ2v.jpg", desc: "2 pizzas grandes, 1 litro de bebida y papas" },
        { categoria: "promo", nombre: "Promo Dúo", precio: 18.00, img: "https://i.imgur.com/4y3bQ2v.jpg", desc: "2 hamburguesas, 1 porción de papas y 1 bebida" },
        //BEBIDAS
        { categoria: "bebidas", nombre: "Coca Cola 1.5L", precio: 3.00, img: "https://i.imgur.com/5y3bQ2v.jpg", desc: "Refresco clásico para acompañar tu comida" },
        { categoria: "bebidas", nombre: "Agua Mineral 500ml", precio: 1.50, img: "https://i.imgur.com/6y3bQ2v.jpg", desc: "Agua fresca y saludable" },
    ];

    // Renderiza productos según la categoría seleccionada
    function renderMenu(categoria = "pizzas") {
        const grid = document.getElementById('menu-grid');
        grid.innerHTML = "";
        productos.filter(p => p.categoria === categoria).forEach(p => {
            grid.innerHTML += `
                <div class="pizza-card bg-yellow-50 rounded-lg overflow-hidden shadow-lg p-6 text-center">
                    <img src="${p.img}" alt="${p.nombre}" class="w-full h-48 object-contain mb-4">
                    <h3 class="text-2xl font-bold text-red-600 mb-2">${p.nombre}</h3>
                    <p class="text-gray-600 mb-4">${p.desc}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xl font-bold">AR$${p.precio.toFixed(2)}</span>
                        <button class="add-to-cart bg-yellow-500 hover:bg-yellow-600 text-gray-800 px-4 py-2 rounded-full transition" data-item="${p.nombre}" data-price="${p.precio}">
                            Añadir +
                        </button>
                    </div>
                </div>
            `;
        });

        // Asigna eventos a los nuevos botones "Añadir +"
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const name = this.getAttribute('data-item');
                const price = parseFloat(this.getAttribute('data-price'));
                const found = cart.find(item => item.name === name);
                if (found) {
                    found.qty += 1;
                } else {
                    cart.push({ name, price, qty: 1 });
                }
                updateCart();
            });
        });
    }

    // Cambia de pestaña al hacer click
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('ring-4', 'ring-yellow-300'));
            this.classList.add('ring-4', 'ring-yellow-300');
            renderMenu(this.dataset.category);
        });
    });

    // Inicializa mostrando pizzas
    renderMenu("pizzas");
    updateCart();
});