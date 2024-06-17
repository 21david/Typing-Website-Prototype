// which, about, not, end, very, some, sometimes, please, thanks, 
// another, other, little, 
// subtract new array from old array for missing words

const easy = [
    // Numbers
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 
    'twenty-one', 'twenty-two', 'thirty', 'thirty-three', 'forty', 'forty-nine', 
    'fifty', 'fifty-two', 'sixty', 'sixty-nine', 'seventy', 
    'eighty', 'ninety', 'ninety-one', 'hundred', 'thousand', 'million', 'billion',

    // Colors
    'blue', 'red', 'green', 'yellow', 'white', 'black', 'purple', 'orange', 'pink', 'brown', 'gray',

    // Days of the week
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    
    // Months
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',

    // Common words
    'the', 'and', 'a', 'but', 'so', 'in', 'on', 'at', 'with', 'for', 'of', 'to', 'from', 'by', 'up', 'down', 'left', 'right',

    // Common Verbs
    'run', 'hide', 'eat', 'drink', 'read', 'write', 'play', 'walk', 'jump', 'sit', 'stand', 'sleep', 'wake', 
    'sing', 'dance', 'talk', 'listen', 'see', 'hear', 'smell', 'touch', 'taste', 'learn', 'teach', 'love', 'like', 
    'hate', 'want', 'need', 'make', 'do', 'say', 'go', 'come', 'take', 'get', 'give', 'know', 'think', 'use', 'find', 
    'ask', 'work', 'help', 'show', 'try', 'call', 'keep', 'start', 'turn', 'move', 'live', 'believe', 
    'bring', 'happen', 'must', 'write', 'provide', 'understand', 'tell', 'put', 'mean', 'become', 'leave', 'follow',

    // Common Nouns
    'dog', 'cat', 'house', 'man', 'woman', 'boy', 'girl', 'friend', 'school', 'book', 'food', 'water', 'car', 'phone', 
    'computer', 'chair', 'table', 'pen', 'pencil', 'paper', 'bag', 'shoe', 'shirt', 't-shirt', 'pants', 'hat', 'bed', 'window', 
    'door', 'hand', 'eye', 'face', 'mouth', 'nose', 'hair', 'leg', 'foot', 'arm', 'head', 'heart', 'city', 'country', 
    'day', 'night', 'week', 'month', 'year', 'today', 'tomorrow', 'yesterday', 'morning', 'afternoon', 'evening', 
    'sun', 'moon', 'star', 'world', 'earth', 'family', 'mother', 'father', 'brother', 'sister', 'child', 'baby', 
    'name', 'number', 'game', 'home', 'job', 'money', 'story', 'street', 'river', 'mountain', 'sea', 'forest', 'garden', 
    'picture', 'photo', 'music', 'movie', 'film', 'song', 'letter', 'word', 'sentence', 'question', 'answer', 'problem', 
    'solution', 'idea', 'life', 'time', 'place', 'thing', 'animal', 'plant', 'tree', 'flower', 'bird', 'fish', 'insect',

    // Common Adjectives
    'big', 'small', 'happy', 'sad', 'good', 'bad', 'new', 'old', 'young', 'early', 'late', 'hot', 'cold', 'warm', 
    'cool', 'fast', 'slow', 'quick', 'beautiful', 'pretty', 'ugly', 'easy', 'hard', 'simple', 'difficult', 'strong', 'weak', 
    'healthy', 'sick', 'rich', 'poor', 'clean', 'dirty', 'safe', 'dangerous', 'light', 'dark', 'heavy',
    'noisy', 'quiet', 'famous', 'important', 'interesting', 'boring', 'angry', 'kind', 'friendly', 
    'polite', 'rude', 'smart', 'stupid', 'lucky', 'unlucky', 'different', 'same', 'early', 'late', 'funny', 'serious',

    // Famous Places
    'America', 'Texas', 'Houston', 'Austin', 'Dallas', 'Galveston', 'USA',
];

const easySpanishTranslations = [
    // Numbers
    'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 
    'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte', 
    'veintiuno', 'veintidós', 'treinta', 'treinta y tres', 'cuarenta', 'cuarenta y nueve', 
    'cincuenta', 'cincuenta y dos', 'sesenta', 'sesenta y nueve', 'setenta',
    'ochenta', 'noventa', 'noventa y uno', 'cien', 'mil (1.000)', 'millón (1.000.000)', 'mil millones (1.000.000.000)',

    // Colors
    'azul', 'rojo', 'verde', 'amarillo', 'blanco', 'negro', 'morado', 'anaranjado, naranja', 'rosa', 'marrón, cafe', 'gris',

    // Days of the week
    'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo',

    // Months
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',

    // Common Words
    'el', 'y', 'un', 'pero', 'entonces', 'en, adentro', 'sobre, encendido', 'en', 'con', 'para', 'de', 'a', 'de, desde', 'por, de', 'arriba', 'abajo', 'izquierda', 'derecha',

    // Common Verbs
    'correr', 'esconder', 'comer', 'beber', 'leer', 'escribir', 'jugar', 'caminar', 'saltar', 'sentar', 'pararse', 'dormir', 'despertar', 
    'cantar', 'bailar', 'hablar', 'escuchar', 'ver', 'oír', 'oler, olor', 'tocar', 'sabor, probar, gusto', 'aprender', 'enseñar', 'amar', 'gustar, como', 
    'odiar', 'desear, querer', 'necesitar', 'hacer, fabricar', 'hacer', 'decir', 'ir', 'venir', 'llevar, tomar', 'conseguir, obtener', 'dar', 'saber', 'pensar', 'usar', 'encontrar', 
    'preguntar', 'trabajar, trabajo', 'ayudar', 'mostrar', 'intentar, probar', 'llamar', 'mantener, guardar', 'empezar', 'girar, turno', 'mover', 'vivir', 'creer', 
    'traer', 'suceder', 'debe', 'escribir', 'proveer', 'entender', 'decir', 'poner', 'malo/amargo, significar', 'convertirse', 'irse, dejar', 'seguir',

    // Common Nouns
    'perro', 'gato', 'casa', 'hombre', 'mujer', 'niño', 'niña', 'amigo', 'escuela', 'libro', 'comida', 'agua', 'carro, auto, coche', 'teléfono', 
    'computadora', 'silla', 'mesa', 'bolígrafo', 'lápiz', 'papel', 'bolsa, chuspa', 'zapato', 'camisa', 'camiseta', 'pantalones', 'sombrero', 'cama', 'ventana', 
    'puerta', 'mano', 'ojo', 'cara', 'boca', 'nariz', 'cabello', 'pierna', 'pie', 'brazo', 'cabeza', 'corazón', 'ciudad', 'país', 
    'día', 'noche', 'semana', 'mes', 'año', 'hoy', 'mañana', 'ayer', 'mañana', 'la tarde', 'la tarde', 
    'sol', 'luna', 'estrella', 'mundo', 'tierra', 'familia', 'madre', 'padre', 'hermano', 'hermana', 'niño', 'bebé', 
    'nombre', 'número', 'juego', 'hogar', 'trabajo', 'dinero', 'historia', 'calle', 'río', 'montaña', 'mar', 'bosque', 'jardín', 
    'imagen, foto', 'foto', 'música', 'película', 'película, filmar', 'canción', 'carta, letra', 'palabra', 'oración', 'pregunta', 'respuesta, responder', 'problema', 
    'solución', 'idea', 'vida', 'tiempo', 'lugar', 'cosa', 'animal', 'planta, plantar', 'árbol', 'flor', 'pájaro', 'pez, pescar', 'insecto',

    // Common Adjectives
    'grande', 'pequeño', 'feliz', 'triste', 'bueno', 'malo', 'nuevo', 'viejo', 'joven', 'temprano', 'tarde', 'caliente', 'frío', 'cálido, caluroso', 
    'fresco, genial, chévere', 'rápido', 'lento', 'rápido', 'hermoso', 'bonito', 'feo', 'fácil', 'difícil, duro', 'simple', 'difícil', 'fuerte', 'débil', 
    'saludable', 'enfermo', 'rico', 'pobre', 'limpio, limpiar', 'sucio', 'seguro, no peligroso', 'peligroso', 'luz, ligero', 'oscuro', 'pesado',
    'ruidoso', 'tranquilo, silencioso', 'famoso', 'importante', 'interesante', 'aburrido, aburridor', 'enojado', 'amable, tipo/clase', 'amigable', 
    'educado', 'grosero, rudo', 'inteligente', 'estúpido', 'afortunado', 'desafortunado', 'diferente', 'igual', 'temprano', 'tarde', 'chistoso, divertido', 'serio',

    // Famous Places
    'America', 'Texas', 'Houston', 'Austin', 'Dallas', 'Galveston', 'EE.UU.',
];


// const easy = [
//     'run', 'hide', 'year', 'and', 'the', 'a', 'but', 'so', 'dog', 'cat', 
//     'house', 'big', 'small', 'happy', 'sad', 'eat', 'drink', 'read', 'write', 'play', 
//     'walk', 'jump', 'sit', 'stand', 'blue', 'red', 'green', 'yellow', 'white', 'black', 
//     'day', 'night', 'man', 'woman', 'boy', 'girl', 'friend', 'school', 'book', 'food', 
//     'water'];

// const easySpanishTranslations = [
//     'correr', 'esconder', 'año', 'y', 'el', 'un', 'pero', 'entonces', 'perro', 'gato', 
//     'casa', 'grande', 'pequeño', 'feliz', 'triste', 'comer', 'beber', 'leer', 'escribir', 'jugar', 
//     'caminar', 'saltar', 'sentar', 'pararse', 'azul', 'rojo', 'verde', 'amarillo', 'blanco', 'negro', 
//     'día', 'noche', 'hombre', 'mujer', 'niño', 'niña', 'amigo', 'escuela', 'libro', 'comida', 
//     'agua'];

// const easy = [
//     "the", "of", "and", "a", "to", "in", "is", "you", "that", "it", "he", "was", "for", "on", "are", 
//     "as", "with", "his", "they", "at", "be", "this", "have", "from", "or", "one", "had", "by", 
//     "word", "but", "not", "what", "all", "were", "we", "when", "your", "can", "said", "there", "use", 
//     "an", "each", "which", "she", "do", "how", "their", "if", "will", "up", "other", "about", "out", 
//     "many", "then", "these", "so", "some", "her", "would", "make", "like", "him", "into", 
//     "time", "has", "look", "two", "more", "write", "go", "see", "number", "no", "way", "could", "people", 
//     "my", "than", "first", "water", "been", "call", "who", "oil", "its", "now", "find", "long", "down", 
//     "day", "did", "get", "come", "made", "may", "part", "over", "new", "sound", "take", "only", "little", 
//     "work", "know", "place", "year", "live", "me", "back", "give", "most", "very", "after", "thing", 
//     "our", "just", "name", "good", "sentence", "man", "think", "say", "great", "where", "help", "through", 
//     "much", "before", "line", "right", "too", "mean", "old", "any", "same", "tell", "boy", "follow", 
//     "came", "want", "show", "also", "around", "form", "three", "small", "set", "put", "end", "does", 
//     "another", "well", "large", "must", "big", "even", "such", "because", "turn", "here", "why", "ask", 
//     "went", "men", "read", "need", "land", "different", "home", "us", "move", "try", "kind", "hand", 
//     "picture", "again", "change", "off", "play", "spell", "air", "away", "animal", "house", "point", 
//     "page", "letter", "mother", "answer", "found", "study", "still", "learn", "should", "world"
// ];

// remove very similar words to make it easier? like 'no' and 'now'