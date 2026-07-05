// Real-time slider value updates
const rainfallSlider = document.getElementById('rainfall');
const rainfallValue = document.getElementById('rainfallValue');
const temperatureSlider = document.getElementById('temperature');
const temperatureValue = document.getElementById('temperatureValue');

rainfallSlider.addEventListener('input', function() {
    rainfallValue.textContent = this.value + ' mm';
});

temperatureSlider.addEventListener('input', function() {
    temperatureValue.textContent = this.value + ' °C';
});

// Form submission and AI recommendation
document.getElementById('farmForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form data
    const formData = {
        soilType: document.getElementById('soilType').value,
        season: document.getElementById('season').value,
        state: document.getElementById('state').value,
        water: document.getElementById('water').value,
        rainfall: document.getElementById('rainfall').value,
        temperature: document.getElementById('temperature').value,
        landArea: document.getElementById('landArea').value,
        budget: document.getElementById('budget').value,
        details: document.getElementById('details').value
    };

    // Generate AI recommendation based on form data
    const recommendation = generateRecommendation(formData);

    // Display output
    displayOutput(recommendation);
});

function generateRecommendation(data) {
    let recommendation = '';

    // Soil type recommendations
    const soilRecommendations = {
        'Loamy': 'Loamy soil is ideal for most crops. It has good water retention and nutrient capacity.',
        'Clay': 'Clay soil retains water well but may have drainage issues. Consider adding organic matter to improve soil structure.',
        'Sandy': 'Sandy soil drains quickly but loses nutrients fast. Regular fertilization and mulching are recommended.'
    };

    // Season-specific crops
    const seasonCrops = {
        'Kharif': 'Rice, Maize, Cotton, Sugarcane, Pulses (Moong, Urad)',
        'Rabi': 'Wheat, Barley, Gram, Mustard, Linseed',
        'Zaid': 'Vegetables (Watermelon, Muskmelon, Cucumber), Summer Pulses'
    };

    // State-specific recommendations
    const stateRecommendations = {
        'Punjab': 'Focus on wheat, rice, and cotton. Ensure proper irrigation during dry periods.',
        'Maharashtra': 'Cotton and sugarcane are primary crops. Manage monsoon water effectively.',
        'Karnataka': 'Coffee, coconut, and sugarcane grow well. Moderate rainfall management is key.',
        'Tamil Nadu': 'Rice in delta regions, cotton in interior areas. Efficient drip irrigation is recommended.',
        'Uttar Pradesh': 'Wheat and rice are staple crops. Utilize canal irrigation systems effectively.'
    };

    // Water level recommendations
    const waterRecommendations = {
        'Low': 'Focus on drought-resistant crops like millets, pulses, and oil seeds. Implement rainwater harvesting.',
        'Medium': 'Most crops can be cultivated. Balance water usage with monsoon patterns.',
        'High': 'Water-loving crops like rice, sugarcane, and cotton can be cultivated. Install proper drainage systems.'
    };

    // Budget recommendations
    const budgetRecommendations = {
        'Low': 'Focus on traditional farming methods. Use minimal inputs. Intercropping can improve returns.',
        'Medium': 'Use improved seeds and moderate fertilization. Consider drip irrigation.',
        'High': 'Invest in advanced techniques, precision agriculture, organic certification, and mechanization.'
    };

    // Build recommendation text
    recommendation += `<strong>Farm Analysis Summary:</strong><br>`;
    recommendation += `📍 Region: ${data.state}<br>`;
    recommendation += `🌾 Season: ${data.season}<br>`;
    recommendation += `🌍 Land Area: ${data.landArea} hectares<br><br>`;

    recommendation += `<strong>🌱 Soil Conditions:</strong><br>`;
    recommendation += soilRecommendations[data.soilType] + `<br><br>`;

    recommendation += `<strong>🌾 Recommended Crops for ${data.season}:</strong><br>`;
    recommendation += seasonCrops[data.season] + `<br><br>`;

    recommendation += `<strong>📍 Regional Insights (${data.state}):</strong><br>`;
    recommendation += stateRecommendations[data.state] + `<br><br>`;

    recommendation += `<strong>💧 Water Management (${data.water} Irrigation):</strong><br>`;
    recommendation += waterRecommendations[data.water] + `<br><br>`;

    recommendation += `<strong>🌡️ Climate Factors:</strong><br>`;
    recommendation += `Annual Rainfall: ${data.rainfall} mm - `;
    if (data.rainfall < 600) {
        recommendation += 'Dry climate. Drought-resistant crops recommended.<br>';
    } else if (data.rainfall < 1500) {
        recommendation += 'Moderate rainfall. Balanced crop selection possible.<br>';
    } else {
        recommendation += 'High rainfall. Water management is critical.<br>';
    }
    recommendation += `Average Temperature: ${data.temperature} °C - `;
    if (data.temperature < 15) {
        recommendation += 'Cool climate. Cold-weather crops recommended.<br>';
    } else if (data.temperature < 30) {
        recommendation += 'Moderate temperature. Most crops can thrive.<br>';
    } else {
        recommendation += 'Hot climate. Heat-resistant crops recommended.<br>';
    }
    recommendation += '<br>';

    recommendation += `<strong>💰 Budget Strategy (${data.budget} Budget):</strong><br>`;
    recommendation += budgetRecommendations[data.budget] + `<br><br>`;

    if (data.details) {
        recommendation += `<strong>📝 Your Additional Notes:</strong><br>"${data.details}"<br><br>`;
    }

    recommendation += `<strong>✅ Action Plan:</strong><br>`;
    recommendation += `<ul>
        <li>Conduct soil testing to verify fertility status</li>
        <li>Plan crop rotation to maintain soil health</li>
        <li>Set up irrigation system based on water availability</li>
        <li>Arrange quality seeds and fertilizers as per budget</li>
        <li>Monitor weather patterns throughout the season</li>
        <li>Keep records of farming activities for future reference</li>
    </ul>`;

    return recommendation;
}

function displayOutput(recommendation) {
    const outputSection = document.getElementById('outputSection');
    const outputContent = document.getElementById('outputContent');

    outputContent.innerHTML = recommendation;
    outputSection.classList.remove('hidden');

    // Scroll to output section
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearOutput() {
    const outputSection = document.getElementById('outputSection');
    outputSection.classList.add('hidden');
    document.getElementById('farmForm').reset();

    // Reset slider values
    rainfallSlider.value = 1500;
    rainfallValue.textContent = '1500 mm';
    temperatureSlider.value = 25;
    temperatureValue.textContent = '25 °C';
}