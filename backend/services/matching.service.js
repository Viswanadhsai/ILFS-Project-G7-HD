export const matchItems = (lostItems, foundItems) => {
    const matches = [];

    lostItems.forEach(lost => {
        foundItems.forEach(found => {

            if (lost.category !== found.category) return;

            const lostName = lost.name.toLowerCase();
            const foundName = found.name.toLowerCase();

            let nameScore = 0;
            if (lostName === foundName) {
                nameScore = 50;
            } else if (foundName.includes(lostName) || lostName.includes(foundName)) {
                nameScore = 40;
            } else {
                const lostWords = lostName.split(" ").filter(Boolean);
                const overlap = lostWords.filter(w => foundName.includes(w)).length;
                if (overlap > 0) nameScore = 20 + overlap * 5;
            }
            if (nameScore === 0) return;

            const lostLoc = lost.location.toLowerCase();
            const foundLoc = found.location.toLowerCase();

            let locationScore = 0;
            if (lostLoc === foundLoc) {
                locationScore = 30;
            } else if (foundLoc.includes(lostLoc) || lostLoc.includes(foundLoc)) {
                locationScore = 20;
            } else {
                const locWords = lostLoc.split(" ").filter(Boolean);
                const overlap = locWords.filter(w => foundLoc.includes(w)).length;
                if (overlap > 0) locationScore = 10 + overlap * 5;
            }
            if (locationScore === 0) return;

            const lostDate = new Date(lost.date);
            const foundDate = new Date(found.date);
            const diffDays = Math.abs((foundDate - lostDate) / (1000 * 60 * 60 * 24));

            let dateScore = 0;
            if (diffDays === 0) dateScore = 20;
            else if (diffDays <= 3) dateScore = 15;
            else if (diffDays <= 7) dateScore = 10;
            else return;

            const totalScore = nameScore + locationScore + dateScore;

            // ⭐ FIX: Add studentId + email so notify works
            matches.push({
                lostId: lost._id,
                foundId: found._id,
                studentId: lost.studentId,   // <-- REQUIRED
                email: lost.email,           // <-- OPTIONAL but useful
                name: lost.name,
                category: lost.category,
                lostLocation: lost.location,
                foundLocation: found.location,
                lostDate: lost.date,
                foundDate: found.date,
                score: totalScore
            });
        });
    });

    return matches.sort((a, b) => b.score - a.score);
};
