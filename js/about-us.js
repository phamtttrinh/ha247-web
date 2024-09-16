
function initOurPersonaSection() {
    const center = { x: 325, y: 175 };
    const pers_dist = 250;
    const pointer_dist = 172;
    const pointer_time = 2;
    const icon_size = 42;
    const circle_radius = 38;
    const text_top_margin = 18;
    const tspan_delta = 16;

    //name is used as the title for the bubble
    //icon is the id of the corresponding svg symbol
    const personas_data = [
        { name: "Trustworthy", icon: "trustworthy" },
        { name: "Professional", icon: "professional" },
        { name: "Compassionate", icon: "compassionate" },
        { name: "Supportive", icon: "supportive" },
        { name: "Caring", icon: "caring" },
        { name: "Efficient", icon: "efficient" },
        { name: "Approachable", icon: "approachable" }
    ];

    const personas = document.getElementById("persona-collection");
    const nav_container = document.getElementById("circle-nav-personas");
    const symbol_copy = document.getElementById("circle-nav-copy");
    const use_copy = document.querySelector("use.nav-copy");

    //Keeps code DRY avoiding namespace for element creation
    function createSVGElement(el) {
        return document.createElementNS("http://www.w3.org/2000/svg", el)
    }

    //Quick setup for multiple attributes
    function setAttributes(el, options) {
        Object.keys(options).forEach(function (attr) {
            el.setAttribute(attr, options[attr]);
        })
    }

    //Persona bubbles are created dynamically
    function addPersona(pers, index) {
        let group = createSVGElement("g");
        group.setAttribute("class", "persona pers-" + index);

        /* This group is needed to apply animations in
          the icon and its background at the same time */
        let icon_group = createSVGElement("g");
        icon_group.setAttribute("class", "icon-wrapper");

        let circle = createSVGElement("circle");
        setAttributes(circle, {
            r: circle_radius,
            cx: center.x,
            cy: center.y
        });
        let circle_shadow = circle.cloneNode();
        setAttributes(circle, {
            class: 'shadow'
        });
        icon_group.appendChild(circle_shadow);
        icon_group.appendChild(circle);

        let symbol = createSVGElement("use");
        setAttributes(symbol, {
            'x': center.x - (icon_size / 2),
            'y': center.y - (icon_size / 2),
            'width': icon_size,
            'height': icon_size,
        });
        symbol.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + pers.icon);
        icon_group.appendChild(symbol);

        group.appendChild(icon_group);

        let text = createSVGElement("text");
        setAttributes(text, {
            x: center.x,
            y: center.y + circle_radius + text_top_margin
        });

        let tspan = createSVGElement("tspan");
        if (pers.name.indexOf('\n') >= 0) {

            let tspan2 = tspan.cloneNode();
            let name = pers.name.split('\n');
            $(tspan).text(name[0]);
            $(tspan2).text(name[1]);

            setAttributes(tspan2, {
                x: center.x,
                dy: tspan_delta
            });

            text.appendChild(tspan);
            text.appendChild(tspan2);
        }
        else {
            $(tspan).text(pers.name);
            text.appendChild(tspan);
        }

        group.appendChild(text);
        personas.appendChild(group);

        let persona_bubble = $(".pers-" + index);

        //Uses tween to look for right position
        twn_pivot_path.seek(index);
        TweenLite.set(persona_bubble, {
            x: pivot_path.x,
            y: pivot_path.y,
            transformOrigin: "center center"
        });

        persona_bubble.click(personaClick);
    }

    //Creates pointer
    function createPointer() {
        let persona_pointer = createSVGElement("circle");

        setAttributes(persona_pointer, {
            cx: center.x - pointer_dist,
            cy: center.y,
            r: 12,
            class: "pointer"
        });

        nav_container.appendChild(persona_pointer);

        persona_pointer = document.querySelector("svg .pointer");

        let pointer_circle = [
            { x: 0, y: 0 },
            { x: pointer_dist, y: pointer_dist },
            { x: pointer_dist * 2, y: 0 },
            { x: pointer_dist, y: -pointer_dist },
            { x: 0, y: 0 }
        ];

        twn_pointer_path.to(persona_pointer, pointer_time, {
            bezier: {
                values: pointer_circle,
                curviness: 1.5
            },
            ease: Power0.easeNone,
            transformOrigin: "center center"
        });

    }

    //Defines behavior for persona bubbles
    function personaClick(ev) {

        //There's always an active persona
        $(".persona.active").removeClass("active");
        $(".center-placeholder-item.active").removeClass("active");

        let current = $(ev.currentTarget);
        current.addClass("active");

        //There's a "pers-*" class for each bubble
        let current_class = current.attr("class").split(" ")[1];
        let class_index = current_class.split('-')[1];

        //Hides current text of the main bubble
        $(use_copy).addClass("changing");

        //Sets pointer to the right position
        twn_pointer_path.tweenTo(class_index * (pointer_time / (2 * 6)));

        $(".placeholder-" + current_class).addClass("active");
        //After it's completely hidden, the text changes and becomes visible
        setTimeout(() => {
            let viewBoxY = 300 * class_index;
            symbol_copy.setAttribute("viewBox", "0 " + viewBoxY + " 300 300");
            $(use_copy).removeClass("changing");
        }, 250)
    }

    //Array describes points for a whole circle in order to get
    //the right curve
    let half_circle = [
        { x: -pers_dist, y: 0 },
        { x: 0, y: pers_dist },
        { x: pers_dist, y: 0 },
        { x: 0, y: -pers_dist },
        { x: -pers_dist, y: 0 }
    ];

    //A simple object is used in the tween to retrieve its values
    var pivot_path = { x: half_circle[0].x, y: half_circle[0].y };

    //The object is animated with a duration based on how many bubbles
    //should be placed
    var twn_pivot_path = TweenMax.to(pivot_path, 12, {
        bezier: {
            values: half_circle,
            curviness: 1.5
        },
        ease: Linear.easeNone
    });

    personas_data.reduce((count, pers) => {
        addPersona(pers, count);
        return ++count;
    }, 0);

    //The variable is modified inside the function
    //but its also used later to toggle its class
    var twn_pointer_path = new TimelineMax({ paused: true });
    createPointer();

    //Adding it immediately triggers a bug for the transform
    setTimeout(() => {
        $("#persona-collection .pers-0").addClass("active");
        $(".center-placeholder .placeholder-pers-0").addClass("active");
    }, 200);
}

function initOurTeamFlexSlider() {
    const itemCount = getGridSize();
    $('.our-team-flexslider').flexslider({
        animation: "slide",
        // easing: "swing",
        direction: "horizontal",
        reverse: false,
        animationLoop: true,
        smoothHeight: false,
        startAt: 0,
        slideshow: true,
        pauseOnAction: true,
        pauseOnHover: false,
        useCSS: true,
        touch: true,
        itemWidth: 400,
        minItems: itemCount,
        maxItems: itemCount
    });
}
// store the slider in a local variable
var $window = $(window),
    flexslider = { vars: {} };

// tiny helper function to add breakpoints
function getGridSize() {
    if (window.innerWidth < 500) { return 1; }
    if (window.innerWidth < 1024) { return 2; }
    return 3;
}
/*-------------------*/
/*-------------------*/
$(function () {
    setTimeout(() => {
        initOurPersonaSection();
        initOurTeamFlexSlider();
        // check grid size on resize event
        $window.resize(function () {
            var gridSize = getGridSize();
            flexslider.vars.minItems = gridSize;
            flexslider.vars.maxItems = gridSize;
        });
    }, 500);
});