import AnimationWidget from '/js/animation-widget-standalone.mjs';
import Siteswap from '/js/siteswap.mjs';

// Funktion zum Initialisieren einer einzelnen Animation
function createSiteswapAnimation(targetElement) {
    const siteswapString = targetElement.textContent || targetElement.innerText;
    
    try {
        const sw = new Siteswap(siteswapString);
        const jif = sw.toJif({
            jugglers: 2,
            flipTwos: true,
            limbs: "ABCD",
            props: Array.apply(null, Array(sw.nProps)).map(() => { return {} })
        });

        const widget = new AnimationWidget({
            target: targetElement,
            props: {
                jif: jif,
                animationSpeed: 0.5,
                teaser: false,
                enableSetting: true,
            }
        });

        // targetElement.addEventListener('click', () => widget.togglePause());

    } catch (error) {
        targetElement.innerHTML = `<p style="color: red;">Fehler beim Parsen von Siteswap: ${siteswapString}</p>`;
        console.error(`Fehler bei Siteswap ${siteswapString}:`, error);
    }
}

// Finde alle Animations-Container und initialisiere sie
document.querySelectorAll('.siteswapanimation').forEach(element => {
    // Leere den Container, bevor die Animation hinzugefügt wird
    const siteswap = element.textContent;
    element.innerHTML = ''; // damit der Siteswap-String nicht stehen bleibt
    element.textContent = siteswap; // Setze den Textinhalt erneut für die Funktion
    createSiteswapAnimation(element);
});
