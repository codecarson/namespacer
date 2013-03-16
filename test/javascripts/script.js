;(function() {
  ///
  // Do minimal work. Should be enough to have a nice page visual. Keep this as light as possible
  // as this will be what loads when flipping through pages so we don't want to do a lot of work here.
  ///


  // set vars and cache element lookups
  var $page = $('#bitty-backyard .page')            // reference to current page element
    , pageFullyLoaded = false
    , drawerSlider      // holds reference to drawer slider object
    , pageResult;

  var pageData = {};
  if(DC.lang == 'fr_CA'){
    pageData = {
      "canadianway": "La cour, style canadien",
      "title": "Enfin le printemps!",
      "say": {
        "facebook": "Voici que vous avez écrit dans Facebook :",
        "question": "Nous vous avons demandé, vous avez répondu : « Quels projets extérieurs avez-vous le plus hâte de commencer ce printemps? »",
        "answer1": {
          "answer":"« Comme ma cour est petite, je vais me faire un jardin fleuri avec une palette. »",
          "name": "Maegan M."
        },
        "answer2": {
          "answer": "« Trouver de l'espace pour un potager. »",
          "name": "Janet M.",
          "location": "Lumby, B.C."
        },
        "answer3": {
          "answer": "« Planter des fleurs sauvages et des légumes dans le jardin. C’est notre premier printemps dans notre nouvelle maison avec une cour! »",
          "name": "Bonnie C.",
          "location": "Vancouver, B.C."
        },
        "answer4": {
          "answer": "« Je vais tenter de faire un potager surélevé pour la première fois. »",
          "name": "Kathryn B.",
          "location": "Ajax, Ont."
        },
        "answer5": {
          "answer": "« Reteindre la terrasse. »",
          "name": "Kate S.",
          "location": "Stoney Creek, Ont."
        },
        "answer6": {
          "answer": "« Déguster des boissons rafraîchissantes sur le nouveau patio! »",
          "name": "Ryan D.",
          "location": "Toronto, Ont."
        },
        "participate": "Partagez votre histoire et faites partie de notre catalogue d’été. Envoyez-la à : <a href=\"mailto:canadianway@cantire.ca\">canadianway@cantire.ca</a>"
      },
      "must_haves": {
        "section": "Les indispensables du printemps :",
        "title": "Nourrissez <span>votre</span> pelouse",
        "body": "Réparez et nourrissez votre pelouse avec des nutriments essentiels en début de saison."
      },
      "featured": {
        "title": "Faites des grillades <span>comme un</span> pro",
        "caption": "Faites l’envie du voisinage grâce à un barbecue qui vous permet de faire des grillades, des sautés et des rôtis, simplement en tournant un bouton."
      },
      "expert_tips": {
        "title": "Conseil d'expert",
        "subtitle":"COMMENT PRÉPARER <span>votre</span> COUR POUR LA BELLE SAISON.",
        "expert": {
          "provided": "Astuces fournis par :",
          "name": "Amanda Mombourquette",
          "title": "Chef principale des activités de catégorie,<br>Articles de terrasse chez Canadian Tire"
        },
        "tip1":{
          "title": "ASSUREZ-VOUS QUE VOTRE BARBECUE <span>EST PRÊT</span>.",
          "body": "Nettoyez l’intérieur et l’extérieur de l’appareil et remplacez le brûleur s’il est rouillé. Passez une éponge savonneuse sur les raccords de combustible et ouvrez la valve; si vous voyez des bulles, c’est qu’il  y a une fuite. Resserrez les raccords et vérifiez à nouveau jusqu’à ce qu’il n’y ait plus de bulles."
        },
        "tip2": {
          "title": "NOURRISSEZ <span>VOS</span> PLATES-BANDES <span>ET</span> ÉTENDEZ DU PAILLIS.",
          "body": "Enlevez les mauvaises herbes et ajoutez des nutriments à la terre sous forme de  compost ou de fumier. Après avoir mis vos plantes en terre, épandez une couche de paillis afin d’empêcher les mauvaises herbes de pousser et pour protéger les jeunes plants."
        },
        "tip3": {
          "title": "COMMENCEZ <span>VOTRE</span> POTAGER.",
          "body": "Ajoutez des nutriments à la terre des plates-bandes surélevées en l’amendant avec quelques pouces de fumier ou de compost. Transplantez vos semis ou semez des graines en pleine terre au moment approprié selon votre zone de rusticité. Les tuteurs et les cages à tomates permettent de soutenir les jeunes plants pendant leur croissance."
        },
        "tip4": {
          "title": "NETTOYEZ <span>VOS</span> MEUBLES DE JARDIN.",
          "body": "Essuyez les surfaces dures et le verre et utilisez une brosse pour déloger la poussière de l’osier ou de la résine tressée. Suivez toujours les instructions d’entretien pour les sièges et les coussins."
        },
        "tip5": {
          "title": "ORGANISEZ <span>VOTRE</span> GARAGE ET VOTRE REMISE.",
          "body": "Mettez un terme au désordre et ajoutez des unités de rangement, avant d’attaquer vos activités du printemps."
        }
      }
    }
  }
  else{
    pageData = {
      "canadianway": "The Canadian Way of Backyards",
      "title": "Spring at Last",
      "say": {
        "facebook": "Here's what you had to say on Facebook",
        "question": "We asked, you answered: \"What yard project are you most excited about starting this spring?\"",
        "answer1": {
          "answer":"\"My backyard is small of so I’m going to make a pallet flower garden.\"",
          "name": "Maegan M.",
          "location": "Falher, Alta."
        },
        "answer2": {
          "answer": "\"Finding someplace for a veggie garden.\"",
          "name": "Janet M.",
          "location": "Lumby, B.C."
        },
        "answer3": {
          "answer": "\"Planting a garden with wildflowers and some veggies. We just moved into a new house so it’s our first spring with a yard! Planting a garden with wild flowers and some veggies.\"",
          "name": "Bonnie C.",
          "location": "Vancouver, B.C."
        },
        "answer4": {
          "answer": "\"I am going try my hand at my first-ever raised-bed vegetable garden.\"",
          "name": "Kathryn B.",
          "location": "Ajax, Ont."
        },
        "answer5": {
          "answer": "\"Re-staining the deck.\"",
          "name": "Kate S.",
          "location": "Stoney Creek, Ont."
        },
        "answer6": {
          "answer": "\"Having a few cold ones on the new patio!\"",
          "name": "Ryan D.",
          "location": "Toronto, Ont."
        },
        "participate": "Share your story and be a part of our Summer Catalogue. Send to: <a href=\"mailto:canadianway@cantire.ca\">canadianway@cantire.ca</a>"
      },
      "must_haves": {
        "section": "Spring must-haves",
        "title": "Feed <span>your</span> lawn",
        "body": "Repair and nourish your turf with these much needed early-season nutrients."
      },
      "featured": {
        "title": "Grill <span>Like a</span> Pro",
        "caption": "Be the envy of all the neighbours with this barbecue system that lets you grill, sear, sauté and roast – all with the turn of a dial."
      },
      "expert_tips": {
        "title": "Expert Tips",
        "subtitle":"HOW TO PREP <span>your</span> YARD FOR SPRING",
        "expert": {
          "provided": "Tips Provided By:",
          "name": "Amanda Mombourquette",
          "title": "Senior Category Business Manager,<br>Patio at Canadian Tire"
        },
        "tip1":{
          "title": "Get your barbecue <span>ready for</span> action.",
          "body": "Clean the unit inside and out and replace a rusted-out burner. Sponge soapy water onto the fuel connections and open the valve; bubbles indicate a leak. Re-tighten and re-check until it’s leak-free."
        },
        "tip2": {
          "title": "Feed <span>and</span> mulch <span>your</span> garden beds.",
          "body": "Pull any early weeds, and put nutrients back into the soil with compost or manure. Spreading a layer of mulch over the soil discourages weeds and protects young plants."
        },
        "tip3": {
          "title": "Start <span>your</span> vegetable garden.",
          "body": "Replenish nutrients by forking in a few inches of manure or compost. Adding stakes or tomato cages help ensures that young plants are well supported."
        },
        "tip4": {
          "title": "Clean <span>your</span> patio furniture.",
          "body": "Wipe down hard surfaces and glass, and use a brush to dig the grit out of wicker or woven-resin. Always follow the care instructions for seat pads and cushions."
        },
        "tip5": {
          "title": "Organize <span>your</span> garage and shed.",
          "body": "Purge clutter and add storage and organizing units as required, before you get busy with spring activities."
        }
      }
    }
  }

  $(document).on('willBecomeCurrentPage', function() {
    ///
    //
    // Should do remainder of page setup to make everything interactive. Here
    // is where you would bind to local events. This is the equivalent of
    // $(document).ready and state should be fully reset/recreated so that
    // pushState will work.
    //
    ///

    // Grab the page.  This could be improved by having this done at a higher layer and having
    // it passed in as a function argument.
    pageResult = pageService.getPage('backyards-bitty-page');
  });

  $(document).on('didBecomeCurrentPage', function() {

    ////////////////////////////////////////////////////////////////
    //
    // Load JSON content for page
    //
    pageResult.done(function(data) {
      // done loading, inject content
      // TODO: handle languages
      data = $.extend(data, pageData);

      var tmpl = $('#tmpl-bitty-backyard').html();
      var compiled = _.template(tmpl, data);
      $('#bitty-backyard #catalog-page').html(compiled);

      // attach click handlers for product drawer
      $('.products, .featured-item').on('click', 'img', function(e) {
        var productId = $(this).data('product-pcode');

        // compile and render the productInfo template
        var product = pageService.getPageProduct(productId);
        drawerSlider.openWithProduct(product);
      });

      pageFullyLoaded = true;
    });

    //
    // initialize ProductDrawer
    //
    drawerSlider = new ProductDrawer($page);

    $('#bitty-backyard #catalog-page').fadeIn('slow');
  });





  $(document).on('willResignCurrentPage', function() {
    ///
    // Should unbind handlers and especially touch/click handlers here. This
    // will typically be triggered when a user initiates a page turn which
    // means the current page should stop doing work and give up focus
    // to the catalog.
    ///
    console.log('willResignCurrentPage');

    if (pageFullyLoaded) {
      // remove click handlers
      $('.products, .featured-item').off('click');

      // cleanup
      drawerSlider.destroy();
    }
  });
}());
