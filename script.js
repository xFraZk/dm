let reviews = JSON.parse(localStorage.getItem('reviews')) || []; 

document.addEventListener("DOMContentLoaded", () => {
    displayReviews();
    updateSummary();
});

function addReview() { 
    const rating = parseInt(document.getElementById('rating').value); 
    const comment = document.getElementById('comment').value.trim(); 
    if (!comment) return alert("Por favor, escribe una reseña."); 
     
    reviews.push({ rating, comment }); 
    localStorage.setItem('reviews', JSON.stringify(reviews)); // Guardar en localStorage
    document.getElementById('comment').value = ''; 
    displayReviews(); 
    updateSummary(); 
} 

function displayReviews() { 
    const reviewsContainer = document.getElementById('reviews'); 
    reviewsContainer.innerHTML = ''; 
    reviews.forEach(review => { 
        const div = document.createElement('div'); 
        div.classList.add('review'); 
        div.innerHTML = `<strong>${'⭐'.repeat(review.rating)}</strong><p>${review.comment}</p>`; 
        reviewsContainer.appendChild(div); 
    }); 
} 

function updateSummary() { 
    if (reviews.length === 0) {
        document.getElementById('summary').innerText = '';
        return;
    } 
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length; 
    let summaryText = "Malo"; 
    if (averageRating >= 4) summaryText = "Excelente"; 
    else if (averageRating >= 3) summaryText = "Muy Bueno"; 
    else if (averageRating >= 2) summaryText = "Regular"; 
    document.getElementById('summary').innerText = `Calificación promedio: ${averageRating.toFixed(1)} ⭐ - ${summaryText}`; 
}
