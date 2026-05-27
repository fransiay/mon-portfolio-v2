// scripts/standardize_cards.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'pages', 'projets.html');
let html = fs.readFileSync(filePath, 'utf-8');

// Helper to ensure description paragraph
function ensureDescription(content) {
  if (content.includes('class="project-description"')) return content;
  const descMatch = content.match(/<div class="project-description">\s*<p>([\s\S]*?)<\/p>\s*<\/div>/);
  if (descMatch) {
    const text = descMatch[1].trim();
    const replacement = `<p class="project-description">${text}</p>`;
    return content.replace(descMatch[0], replacement);
  }
  // Fallback: first <p> inside content
  const pMatch = content.match(/<p>([\s\S]*?)<\/p>/);
  if (pMatch) {
    const text = pMatch[1].trim();
    const replacement = `<p class="project-description">${text}</p>`;
    return content.replace(pMatch[0], replacement);
  }
  return content;
}

// Helper to generate a feature list from description text
function generateFeaturesFromText(text) {
  // Split description into clauses by punctuation or commas, keep short parts
  const clauses = text.split(/[\.,;\n]/).map(s => s.trim()).filter(Boolean);
  // Take up to 5 non‑empty, concise clauses
  const features = [];
  for (let i = 0; i < clauses.length && features.length < 5; i++) {
    const clause = clauses[i];
    // Ensure clause is short (max ~60 characters) and ends without stray words
    if (clause.length <= 80) {
      // Capitalize first letter and ensure it reads like a bullet
      const formatted = clause.charAt(0).toUpperCase() + clause.slice(1);
      features.push(formatted);
    }
  }
  return features;
}

// Helper to ensure features list
// Helper to ensure features list
function ensureFeatures(content) {
  if (content.includes('class="project-features"')) {
    // Trim to max 5 items
    const ulMatch = content.match(/\u003cul class="project-features"\u003e([\s\S]*?)\u003c\/ul\u003e/);
    if (ulMatch) {
      const items = ulMatch[1].match(/\u003cli\u003e/g) || [];
      if (items.length > 5) {
        const limited = ulMatch[1]
          .split(/\u003cli\u003e/)
          .filter((_, i) => i > 0 && i <= 5)
          .map(li => `\u003cli\u003e${li.replace(/\u003c\\/li\u003e.*/, '')}\u003c/li\u003e`)
          .join('');
        const newUl = `\u003cul class="project-features"\u003e${limited}\u003c/ul\u003e`;
        return content.replace(ulMatch[0], newUl);
      }
      return content;
    }
    return content;
  }

  // No existing features list – generate from description or use fallback placeholders
  const descMatch = content.match(/\u003cp class="project-description"\u003e([\s\S]*?)\u003c\/p\u003e/);
  let features = [];
  if (descMatch) {
    const descText = descMatch[1].trim();
    features = generateFeaturesFromText(descText);
  }
  if (features.length === 0) {
    // Fallback placeholders (should rarely happen)
    features = ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"];
  }
  const listItems = features.map(f => `    \u003cli\u003e${f}\u003c/li\u003e`).join('\n');
  const placeholder = `\u003cul class="project-features"\u003e\n${listItems}\n  \u003c/ul\u003e`;
  // Insert before the tech div
  return content.replace(/(<div class="project-tech"\u003e)/, `${placeholder}\n$1`);
}

  if (content.includes('class="project-features"')) {
    // Trim to max 5 items
    const ulMatch = content.match(/<ul class="project-features">([\s\S]*?)<\/ul>/);
    if (ulMatch) {
      const items = ulMatch[1].match(/<li>/g) || [];
      if (items.length > 5) {
        const limited = ulMatch[1]
          .split(/<li>/)
          .filter((_, i) => i > 0 && i <= 5)
          .map(li => `<li>${li.replace(/<\/li>.*/, '')}</li>`)
          .join('');
        const newUl = `<ul class="project-features">${limited}</ul>`;
        return content.replace(ulMatch[0], newUl);
      }
    }
    return content;
  }

  // No existing features list – create one from description text
  const descMatch = content.match(/<p class="project-description">([\s\S]*?)<\/p>/);
  let features = [];
  if (descMatch) {
    const descText = descMatch[1];
    features = generateFeaturesFromText(descText);
  }
  if (features.length === 0) {
    // Fallback placeholder (should rarely happen)
    features = ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"];
  }
  const listItems = features.map(f => `    <li>${f}</li>`).join('\n');
  const placeholder = `<ul class="project-features">\n${listItems}\n  </ul>`;
  // Insert before tech tags
  return content.replace(/(<\/div>\s*<!--?\s*project-tech)/, `${placeholder}\n$1`);
}

// Process each article
const articleRegex = /<article class="project-card"[\s\S]*?<\/article>/g;
let changed = false;
html = html.replace(articleRegex, (article) => {
  const contentRegex = /<div class="project-content">([\s\S]*?)<\/div>/;
  const match = article.match(contentRegex);
  if (!match) return article;
  let inner = match[1];
  const before = article.slice(0, match.index + match[0].indexOf(inner));
  const after = article.slice(match.index + match[0].indexOf(inner) + inner.length);
  inner = ensureDescription(inner);
  inner = ensureFeatures(inner);
  const newArticle = `${before}${inner}${after}`;
  if (newArticle !== article) changed = true;
  return newArticle;
});

if (changed) {
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log('Standardized project cards.');
} else {
  console.log('No changes needed.');
}
