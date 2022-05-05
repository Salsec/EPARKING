/* !
 * Bibliothèque JavaScript jQuery v3.6.0
 * https://jquery.com/
 *
 * Inclut Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation et autres contributeurs
 * Publié sous la licence MIT
 * https://jquery.org/license
 *
 * Date : 2021-03-02T17:08Z
 */
( fonction( global, usine ) {

	"utiliser strictement" ;

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// Pour les environnements de type CommonJS et CommonJS où une "fenêtre" appropriée
		// est présent, exécutez la fabrique et récupérez jQuery.
		// Pour les environnements qui n'ont pas de `fenêtre` avec un `document`
		// (comme Node.js), expose une usine en tant que module.exports.
		// Cela accentue la nécessité de la création d'une véritable `fenêtre`.
		// par exemple var jQuery = require("jquery")(window);
		// Voir le ticket #14549 pour plus d'informations.
		module.exports = global.document ?
			usine( global, vrai ) :
			fonction( w ) {
				si ( !w.document ) {
					throw new Error( "jQuery requiert une fenêtre avec un document" );
				}
				retour usine( w );
			} ;
	} autre {
		usine (globale);
	}

// Passez ceci si la fenêtre n'est pas encore définie
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Bord <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// lève des exceptions lorsque du code non strict (par exemple, ASP.NET 4.5) accède au mode strict
// arguments.appelé.appelant (trac-13335). Mais à partir de jQuery 3.0 (2016), le mode strict devrait être commun
// suffisamment pour que toutes ces tentatives soient gardées dans un bloc try.
"utiliser strictement" ;

var arr = [] ;

var getProto = Object.getPrototypeOf ;

var tranche = arr.tranche ;

var plat = arr.plat ? fonction (tableau) {
	return arr.flat.call( array );
} : fonction (tableau) {
	return arr.concat.apply( [], tableau );
} ;


var push = arr.push;

var indexOf = arr.indexOf;

var classe2type = {} ;

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty ;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var prise en charge = {} ;

var estFonction = fonction estFonction( obj ) {

		// Prise en charge : Chrome <=57, Firefox <=52
		// Dans certains navigateurs, typeof renvoie "function" pour les éléments HTML <object>
		// (c'est-à-dire, `typeof document.createElement( "object" ) === "function"`).
		// Nous ne voulons pas classer *n'importe* nœud DOM en tant que fonction.
		// Prise en charge : QtWeb <=3.8.5, WebKit <=534.34, outil wkhtmltopdf <=0.12.5
		// De plus pour l'ancien WebKit, typeof renvoie "function" pour les collections HTML
		// (par exemple, `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "fonction" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "fonction" ;
	} ;


var estFenêtre = function estFenêtre( obj ) {
		return obj != null && obj === obj.window;
	} ;


var document = fenêtre.document;



	var AttributsScript préservés = {
		type : vrai,
		src : vrai,
		nonce : vrai,
		aucunModule : vrai
	} ;

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var je, val,
			script = doc.createElement( "script" );

		script.text = code;
		si ( nœud ) {
			for ( i in preserveScriptAttributes ) {

				// Prise en charge : Firefox 64+, Edge 18+
				// Certains navigateurs ne prennent pas en charge la propriété "nonce" sur les scripts.
				// D'un autre côté, il ne suffit pas d'utiliser `getAttribute` car
				// l'attribut `nonce` est réinitialisé à une chaîne vide chaque fois qu'il
				// devient connecté au contexte de navigation.
				// Voir https://github.com/whatwg/html/issues/2369
				// Voir https://html.spec.whatwg.org/#nonce-attributes
				// La vérification `node.getAttribute` a été ajoutée pour des raisons de
				// `jQuery.globalEval` afin qu'il puisse simuler un nœud contenant nonce
				// via un objet.
				val = nœud[ je ] || node.getAttribute && node.getAttribute( i );
				si (val) {
					script.setAttribute( je, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	si ( obj == null ) {
		retourner obj + "" ;
	}

	// Support : Android <=2.3 uniquement (RegExp fonctionnel)
	return typeof obj === "objet" || type d'obj === "fonction" ?
		class2type[ toString.call( obj ) ] || "objet" :
		type d'obj ;
}
/* Symbole global */
// Définir ce global dans .eslintrc.json créerait un danger d'utiliser le global
// non surveillé à un autre endroit, il semble plus sûr de définir global uniquement pour ce module



var
	version = "3.6.0",

	// Définit une copie locale de jQuery
	jQuery = fonction (sélecteur, contexte) {

		// L'objet jQuery n'est en fait que le constructeur init 'amélioré'
		// Besoin d'init si jQuery est appelé (permettez simplement à l'erreur d'être générée si elle n'est pas incluse)
		return new jQuery.fn.init( selector, context );
	} ;

jQuery.fn = jQuery.prototype = {

	// La version actuelle de jQuery utilisée
	jquery : version,

	constructeur : jQuery,

	// La longueur par défaut d'un objet jQuery est 0
	longueur : 0,

	versTableau : fonction() {
		return slice.call( this );
	},

	// Récupère le Nième élément dans l'ensemble d'éléments correspondant OU
	// Récupère l'ensemble des éléments correspondants sous la forme d'un tableau propre
	obtenir : fonction (num) {

		// Retourne tous les éléments dans un tableau propre
		si (num == nul) {
			return slice.call( this );
		}

		// Renvoie un seul élément de l'ensemble
		nombre de retour < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Prend un tableau d'éléments et le pousse sur la pile
	// (renvoie le nouvel ensemble d'éléments correspondants)
	pushStack : fonction (éléments) {

		// Construire un nouvel ensemble d'éléments correspondants jQuery
		var ret = jQuery.merge( this.constructor(), elems );

		// Ajoute l'ancien objet sur la pile (comme référence)
		ret.prevObject = this ;

		// Renvoie l'ensemble d'éléments nouvellement formé
		retour ret;
	},

	// Exécute un rappel pour chaque élément de l'ensemble correspondant.
	chacun : fonction (rappel) {
		return jQuery.each( this, callback );
	},

	carte : fonction (rappel) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	tranche : fonction() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	d'abord : fonction() {
		retourne this.eq( 0 );
	},

	dernier : fonction() {
		return this.eq( -1 );
	},

	pair : fonction() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			retour ( je + 1 ) % 2;
		} ) );
	},

	impair : fonction() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			renvoie je % 2;
		} ) );
	},

	eq : fonction( je ) {
		var len = this.length,
			j = +i + ( je < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	fin : fonction() {
		renvoie this.prevObject || this.constructor();
	},

	// Pour usage interne uniquement.
	// Se comporte comme une méthode Array, pas comme une méthode jQuery.
	poussez, poussez,
	trier : arr.trier,
	splice : arr.splice
} ;

jQuery.extend = jQuery.fn.extend = fonction() {
	options var, nom, src, copie, copyIsArray, clone,
		cible = arguments[ 0 ] || {},
		je = 1,
		longueur = arguments.longueur,
		profond = faux ;

	// Gérer une situation de copie profonde
	if ( typeof cible === "booléen" ) {
		profond = cible ;

		// Ignore le booléen et la cible
		cible = arguments[ je ] || {} ;
		je++ ;
	}

	// Gère la casse lorsque la cible est une chaîne ou quelque chose (possible en copie profonde)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		cible = {} ;
	}

	// Étend jQuery lui-même si un seul argument est passé
	si ( je === longueur ) {
		cible = ceci ;
		je--;
	}

	pour (; je < longueur; je++ ) {

		// Ne traite que les valeurs non nulles/indéfinies
		si ( ( options = arguments[ je ] ) != null ) {

			// Étendre l'objet de base
			pour ( nom dans les options ) {
				copie = options[ nom ] ;

				// Empêcher la pollution d'Objet.prototype
				// Empêcher la boucle sans fin
				if ( nom === "__proto__" || cible === copier ) {
					Continuez;
				}

				// Recurse si nous fusionnons des objets simples ou des tableaux
				if ( profonde && copie && ( jQuery.isPlainObject( copie ) ||
					( copyIsArray = Array.isArray( copie ) ) ) ) {
					src = cible[ nom ] ;

					// Garantit le bon type pour la valeur source
					if ( copyIsArray && !Array.isArray( src ) ) {
						cloner = [] ;
					} sinon si ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						cloner = {} ;
					} autre {
						clone = src ;
					}
					copyIsArray = faux ;

					// Ne déplacez jamais les objets d'origine, clonez-les
					cible[ nom ] = jQuery.extend( profondeur, clone, copie );

				// N'apporte pas de valeurs indéfinies
				} sinon si ( copier !== non défini ) {
					cible[ nom ] = copier ;
				}
			}
		}
	}

	// Retourne l'objet modifié
	cible de retour ;
} ;

jQuery.extend( {

	// Unique pour chaque copie de jQuery sur la page
	expando : "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Supposons que jQuery est prêt sans le module prêt
	est prêt : vrai,

	erreur : fonction( msg ) {
		lancer une nouvelle erreur ( msg );
	},

	noop: fonction() {},

	estObjetPlain : fonction( obj ) {
		var proto, Ctor ;

		// Détecter les négatifs évidents
		// Utilisez toString au lieu de jQuery.type pour intercepter les objets hôtes
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			retourner faux ;
		}

		proto = getProto( obj );

		// Les objets sans prototype (par exemple, `Object.create( null )`) sont simples
		si ( !proto ) {
			retourner vrai ;
		}

		// Les objets avec prototype sont clairs ssi ils ont été construits par une fonction globale d'objet
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "fonction" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject : fonction( obj ) {
		nom de la variable ;

		pour ( nom dans obj ) {
			retourner faux ;
		}
		retourner vrai ;
	},

	// Évalue un script dans un contexte fourni ; retombe dans le global
	// si non spécifié.
	globalEval : fonction( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	chacun : function( obj, callback ) {
		var longueur, je = 0 ;

		if ( isArrayLike( obj ) ) {
			longueur = obj.longueur ;
			pour (; je < longueur; je++ ) {
				if ( callback.call( obj[ je ], je, obj[ je ] ) === faux ) {
					Pause;
				}
			}
		} autre {
			pour ( je dans obj ) {
				if ( callback.call( obj[ je ], je, obj[ je ] ) === faux ) {
					Pause;
				}
			}
		}

		retourner obj ;
	},

	// les résultats sont à usage interne uniquement
	makeArray: function( arr, résultats ) {
		var ret = résultats || [] ;

		si ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "chaîne" ?
						[ arr ] : arr
				);
			} autre {
				push.call( ret, arr );
			}
		}

		retour ret;
	},

	inArray: function( elem, arr, je ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Prise en charge : Android <= 4.0 uniquement, PhantomJS 1 uniquement
	// push.apply(_, arraylike) lance sur l'ancien WebKit
	fusionner : fonction (premier, deuxième) {
		var len = +seconde.longueur,
			j = 0,
			i = première.longueur ;

		pour ( ; j < len; j++ ) {
			premier[ i++ ] = deuxième[ j ] ;
		}

		première.longueur = i ;

		revenir en premier ;
	},

	grep : fonction (éléments, rappel, inversion) {
		var callbackInverse,
			correspondances = [],
			je = 0,
			longueur = éléments.longueur,
			callbackAttend = !inversé;

		// Parcourt le tableau en ne sauvegardant que les éléments
		// qui passe la fonction validateur
		pour (; je < longueur; je++ ) {
			callbackInverse = !callback( elems[ je ], je );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		matchs retour;
	},

	// arg est à usage interne uniquement
	map: function( elems, callback, arg ) {
		var longueur, valeur,
			je = 0,
			ret = [] ;

		// Parcourez le tableau, traduisant chacun des éléments en leurs nouvelles valeurs
		if ( isArrayLike( elems ) ) {
			longueur = elems.longueur ;
			pour (; je < longueur; je++ ) {
				value = callback( elems[ je ], je, arg );

				si ( valeur != null ) {
					ret.push( valeur );
				}
			}

		// Parcourt toutes les touches de l'objet,
		} autre {
			pour ( je en éléments ) {
				value = callback( elems[ je ], je, arg );

				si ( valeur != null ) {
					ret.push( valeur );
				}
			}
		}

		// Aplatir tous les tableaux imbriqués
		return flat( ret );
	},

	// Un compteur GUID global pour les objets
	guide : 1,

	// jQuery.support n'est pas utilisé dans Core mais d'autres projets attachent leur
	// propriétés pour qu'il existe.
	soutien : soutien
} );

if ( typeof Symbol === "fonction" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Remplir la carte class2type
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	fonction( _i, nom ) {
		class2type[ "[objet " + nom + "]" ] = nom.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support : réel iOS 8.2 uniquement (non reproductible en simulateur)
	// Vérification `in` utilisée pour empêcher l'erreur JIT (gh-2145)
	// hasOwn n'est pas utilisé ici en raison de faux négatifs
	// concernant la longueur de la Nodelist dans IE
	var longueur = !!obj && "longueur" dans obj && obj.longueur,
		type = toType( obj );

	si ( estFonction( obj ) || estFenêtre( obj ) ) {
		retourner faux ;
	}

	type de retour === "tableau" || longueur === 0 ||
		typeof longueur === "nombre" && longueur > 0 && ( longueur - 1 ) dans obj;
}
var grésillement =
/* !
 * Moteur de sélection CSS Sizzle v2.3.6
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation et autres contributeurs
 * Publié sous la licence MIT
 * https://js.fondation/
 *
 * Date : 2021-02-16
 */
( fonction ( fenêtre ) {
var je,
	Support,
	expr,
	getText,
	estXML,
	tokeniser,
	compiler,
	sélectionner,
	OutermostContext,
	sortInput,
	aDuplique,

	// Variables locales du document
	setDocument,
	document,
	docElem,
	documentEstHTML,
	rbuggyQSA,
	rbuggyMatchs,
	allumettes,
	contient,

	// Données spécifiques à l'instance
	expando = "grésiller" + 1 * nouvelle Date(),
	preferedDoc = window.document,
	dirruns = 0,
	fait = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	triOrdre = fonction( a, b ) {
		si ( une === b ) {
			aDuplique = vrai;
		}
		renvoie 0 ;
	},

	// Méthodes d'instance
	aOwn = ( {} ).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	pushNative = arr.push,
	push = arr.push,
	tranche = arr.tranche,

	// Utilisez un indexOf simplifié car il est plus rapide que le natif
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = fonction( liste, elem ) {
		var je = 0,
			len = liste.longueur ;
		pour (; je < longueur; je++ ) {
			si ( liste[ je ] === élém ) {
				retourner je ;
			}
		}
		retour -1 ;
	},

	booléens = "vérifié|sélectionné|asynchrone|autofocus|lecture automatique|contrôles|différer|désactivé|caché|" +
		"ismap|boucle|multiple|ouvert|lecture seule|obligatoire|étendue",

	// Expressions régulières

	// http://www.w3.org/TR/css3-selectors/#whitespace
	espace = "[\\x20\\t\\r\\n\\f]",

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifiant = "(?:\\\\[\\da-fA-F]{1,6}" + espace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Sélecteurs d'attributs : http://www.w3.org/TR/selectors/#attribute-selectors
	attributs = "\\[" + espace + "*(" + identifiant + ")(?:" + espace +

		// Opérateur (capture 2)
		"*([*^$|!~]?=)" + espace +

		// "Les valeurs des attributs doivent être des identifiants CSS [capture 5]
		// ou chaînes [capture 3 ou capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"] )*)\"|(" + identifiant + "))|)" +
		espace + "*\\]",

	pseudos = ":(" + identifiant + ")(?:\\((" +

		// Pour réduire le nombre de sélecteurs nécessitant une tokenisation dans le préFiltre, préférez les arguments :
		// 1. entre guillemets (capture 3 ; capture 4 ou capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*) \")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributs + ")*)|" +

		// 3. autre chose (capture 2)
		".*" +
		")\\)|)",

	// Espace blanc de début et de fin non échappé, capturant certains caractères non blancs précédant ce dernier
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + espace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
		espace + "+$", "g" ),

	rcomma = new RegExp( "^" + espace + "*," + espace + "*" ),
	rcombinators = new RegExp( "^" + espace + "*([>+~]|" + espace + ")" + espace +
		"*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifiant + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifiant + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifiant + ")" ),
		"TAG": new RegExp( "^(" + identifiant + "|[*])" ),
		"ATTR": nouvelle RegExp( "^" + attributs ),
		"PSEUDO": nouvelle RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|ntième|ntième-dernier)-(child|of-type)(?:\\(" +
			espace + "*(pair|impair|(([+-]|)(\\d*)n|)" + espace + "*(?:([+-]|)" +
			espace + "*(\\d+)|))" + espace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booléens + ")$", "i" ),

		// A utiliser dans les bibliothèques implémentant .is()
		// Nous l'utilisons pour la correspondance POS dans `select`
		"needsContext": new RegExp( "^" + espace +
			"*[>+~]|:(pair|impair|eq|gt|lt|ntième|premier|dernier)(?:\\(" + espace +
			"*((?:-\\d)?\\d*)" + espace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|zonetexte|bouton)$/i,
	rheader = /^h\d$/i,

	rnatif = /^[^{]+\{\s*\[natif \w/,

	// Sélecteurs d'ID ou de TAG ou de CLASS facilement analysables/récupérables
	rExprrapide = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	frère = /[+~]/,

	// échappements CSS
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + espace + "?|\\\\([^\\r\\n\\f])" , "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		retourner nonHex ?

			// Supprime le préfixe antislash d'une séquence d'échappement non hexadécimale
			nonHex :

			// Remplace une séquence d'échappement hexadécimale par le point de code Unicode encodé
			// Prise en charge : Internet Explorer <=11+
			// Pour les valeurs en dehors du plan multilingue de base (BMP), construisez manuellement un
			// paire de substitution
			élevé < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( haut >> 10 | 0xD800, haut & 0x3FF | 0xDC00 );
	},

	// Sérialisation de chaîne CSS/identifiant
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		si ( asCodePoint ) {

			// U+0000 NULL devient U+FFFD CARACTERE DE REMPLACEMENT
			si ( ch === "\0" ) {
				retourne "\uFFFD" ;
			}

			// Les caractères de contrôle et (selon la position) les nombres sont échappés en tant que points de code
			return ch.slice( 0, -1 ) + "\\" +
				ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " " ;
		}

		// D'autres caractères ASCII potentiellement spéciaux sont échappés par une barre oblique inverse
		retourne "\\" + ch ;
	},

	// Utilisé pour les iframes
	// Voir setDocument()
	// La suppression du wrapper de la fonction provoque un "Permission Denied"
	// erreur dans IE
	déchargerHandler = fonction() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		fonction (élément) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset" ;
		},
		{ répertoire : "parentNode", suivant : "légende" }
	);

// Optimiser pour push.apply( _, NodeList )
essayer {
	push.apply(
		( arr = slice.call( preferDoc.childNodes ) ),
		preferedDoc.childNodes
	);

	// Prise en charge : Android<4.0
	// Détecte l'échec silencieux de push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferedDoc.childNodes.length ].nodeType ;
} attraper ( e ) {
	push = { appliquer : arr.longueur ?

		// Tirez parti de la tranche si possible
		fonction( cible, els ) {
			pushNative.apply( cible, slice.call( els ) );
		} :

		// Prise en charge : IE<9
		// Sinon ajouter directement
		fonction( cible, els ) {
			var j = cible.longueur,
				je = 0 ;

			// Impossible de faire confiance à NodeList.length
			tandis que ( ( cible[ j++ ] = els[ i++ ] ) ) {}
			cible.longueur = j - 1 ;
		}
	} ;
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, correspondance, groupes, newSelector,
		newContext = contexte && context.ownerDocument,

		// nodeType vaut 9 par défaut, puisque context vaut document par défaut
		nodeType = contexte ? context.nodeType : 9;

	résultats = résultats || [] ;

	// Retour anticipé à partir d'appels avec un sélecteur ou un contexte invalide
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		retourner les résultats ;
	}

	// Essayez de raccourcir les opérations de recherche (par opposition aux filtres) dans les documents HTML
	si ( ! graine ) {
		setDocument(contexte);
		contexte = contexte || document;

		si ( documentEstHTML ) {

			// Si le sélecteur est suffisamment simple, essayez d'utiliser une méthode DOM "get*By*"
			// (à l'exception du contexte DocumentFragment, où les méthodes n'existent pas)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// Sélecteur d'identifiant
				si ( ( m = match[ 1 ] ) ) {

					// Contexte du document
					si ( nodeType === 9 ) {
						si ( ( elem = context.getElementById( m ) ) ) {

							// Prise en charge : IE, Opera, Webkit
							// TODO : identifier les versions
							// getElementById peut faire correspondre les éléments par leur nom au lieu de leur ID
							si ( elem.id === m ) {
								résultats.push( elem );
								retourner les résultats ;
							}
						} autre {
							retourner les résultats ;
						}

					// Contexte de l'élément
					} autre {

						// Prise en charge : IE, Opera, Webkit
						// TODO : identifier les versions
						// getElementById peut faire correspondre les éléments par leur nom au lieu de leur ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							contient (contexte, élément) &&
							elem.id === m ) {

							résultats.push( elem );
							retourner les résultats ;
						}
					}

				// Sélecteur de type
				} sinon si ( match[ 2 ] ) {
					push.apply( résultats, context.getElementsByTagName( selector ) );
					retourner les résultats ;

				// Sélecteur de classe
				} sinon si ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
					contexte.getElementsByClassName ) {

					push.apply( résultats, context.getElementsByClassName( m ) );
					retourner les résultats ;
				}
			}

			// Profitez de querySelectorAll
			si ( support.qsa &&
				!nonnativeSelectorCache[ sélecteur + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( sélecteur ) ) &&

				// Prise en charge : IE 8 uniquement
				// Exclure les éléments de l'objet
				( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

				nouveauSélecteur = sélecteur ;
				nouveauContexte = contexte ;

				// qSA considère les éléments en dehors d'une racine de portée lors de l'évaluation de l'enfant ou
				// combinateurs descendants, ce qui n'est pas ce que nous voulons.
				// Dans de tels cas, nous contournons le comportement en préfixant chaque sélecteur dans le
				// liste avec un sélecteur d'ID référençant le contexte de portée.
				// La technique doit également être utilisée lorsqu'un combinateur principal est utilisé
				// en tant que tels, les sélecteurs ne sont pas reconnus par querySelectorAll.
				// Merci à Andrew Dupont pour cette technique.
				si ( nodeType === 1 &&
					( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

					// Développer le contexte pour les sélecteurs frères
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						le contexte;

					// Nous pouvons utiliser :scope au lieu de l'ID hack si le navigateur
					// le prend en charge & si nous ne modifions pas le contexte.
					if ( nouveauContexte !== contexte || !support.scope ) {

						// Capturez l'ID de contexte, en le définissant d'abord si nécessaire
						si ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} autre {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Préfixe chaque sélecteur dans la liste
					groupes = tokenize( sélecteur );
					i = groupes.longueur ;
					alors que je-- ) {
						groupes[ je ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groupes[ i ] );
					}
					nouveauSélecteur = groupes.join( "," );
				}

				essayer {
					push.apply( résultats,
						newContext.querySelectorAll( nouveauSelecteur )
					);
					retourner les résultats ;
				} capture ( erreur qsa ) {
					nonnativeSelectorCache( selector, true );
				} finalement {
					if (nid === expando) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// Tous les autres
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Créer des caches clé-valeur de taille limitée
 * @returns {function(string, object)} Renvoie les données de l'objet après les avoir stockées sur lui-même avec
 * nom de la propriété la chaîne (avec un suffixe d'espace) et (si le cache est plus grand que Expr.cacheLength)
 * suppression de l'entrée la plus ancienne
 */
function créerCache() {
	var clés = [] ;

	fonction cache( clé, valeur ) {

		// Utilisez (touche + " ") pour éviter les collisions avec les propriétés natives du prototype (voir le problème n° 157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Ne conserver que les entrées les plus récentes
			supprimer le cache[keys.shift()] ;
		}
		return ( cache[ clé + " " ] = valeur );
	}
	cache de retour ;
}

/**
 * Marquer une fonction pour une utilisation spéciale par Sizzle
 * @param {Fonction} fn La fonction à marquer
 */
fonction marqueFonction( fn ) {
	fn[ expando ] = vrai ;
	retour fn ;
}

/**
 * Prise en charge des tests à l'aide d'un élément
 * @param {Fonction} fn Passe l'élément créé et renvoie un résultat booléen
 */
fonction assert( fn ) {
	var el = document.createElement( "ensemble de champs" );

	essayer {
		return !!fn( el );
	} attraper ( e ) {
		retourner faux ;
	} finalement {

		// Supprimer de son parent par défaut
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// libère de la mémoire dans IE
		el = nul ;
	}
}

/**
 * Ajoute le même gestionnaire pour tous les attributs spécifiés
 * @param {String} attrs Liste d'attributs séparés par des tubes
 * @param {Function} handler La méthode qui sera appliquée
 */
fonction addHandle( attrs, gestionnaire ) {
	var arr = attrs.split( "|" ),
		i = arr.longueur ;

	alors que je-- ) {
		Expr.attrHandle[ arr[ i ] ] = gestionnaire ;
	}
}

/**
 * Vérifie l'ordre des documents de deux frères et sœurs
 * @param {Élément} a
 * @param {Élément} b
 * @returns {Number} Renvoie inférieur à 0 si a précède b, supérieur à 0 si a suit b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex ;

	// Utiliser IE sourceIndex si disponible sur les deux nœuds
	si ( diff ) {
		retour diff ;
	}

	// Vérifie si b suit a
	si ( cur ) {
		tandis que ( ( cur = cur.nextSibling ) ) {
			si ( cur === b ) {
				retour -1 ;
			}
		}
	}

	retourner un ? 1 : -1 ;
}

/**
 * Renvoie une fonction à utiliser dans les pseudos pour les types d'entrée
 * Type @param {chaîne}
 */
function createInputPseudo( type ) {
	fonction de retour (élément) {
		var nom = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	} ;
}

/**
 * Renvoie une fonction à utiliser dans les pseudos pour les boutons
 * Type @param {chaîne}
 */
function createButtonPseudo( type ) {
	fonction de retour (élément) {
		var nom = elem.nodeName.toLowerCase();
		return ( nom === "entrée" || nom === "bouton" ) && elem.type === type;
	} ;
}

/**
 * Renvoie une fonction à utiliser dans les pseudos pour :enabled/:disabled
 * @param {booléen} désactivé true pour :disabled ; faux pour : activé
 */
fonction createDisabledPseudo (désactivé) {

	// Connus :désactivés faux positifs : fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	fonction de retour (élément) {

		// Seuls certains éléments peuvent correspondre à :enabled ou :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "forme" dans elem ) {

			// Vérifie la désactivation héritée sur les éléments pertinents non désactivés :
			// * éléments listés associés au formulaire dans un fieldset désactivé
			// https://html.spec.whatwg.org/multipage/forms.html#category-listed
			// https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * éléments d'option dans un optgroup désactivé
			// https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// Tous ces éléments ont une propriété "form".
			if ( elem.parentNode && elem.disabled === false ) {

				// Les éléments d'option renvoient à un optgroup parent s'il est présent
				if ( "étiquette" dans elem ) {
					if ( "étiquette" dans elem.parentNode ) {
						return elem.parentNode.disabled === désactivé ;
					} autre {
						return elem.disabled === désactivé ;
					}
				}

				// Prise en charge : Internet Explorer 6 - 11
				// Utilisez la propriété de raccourci isDisabled pour vérifier les ancêtres des ensembles de champs désactivés
				return elem.isDisabled === désactivé ||

					// Là où il n'y a pas isDisabled, vérifier manuellement
					/* jshint -W018 */
					elem.isDisabled !== !désactivé &&
					inDisabledFieldset( elem ) === désactivé ;
			}

			return elem.disabled === désactivé ;

		// Essayez de trier les éléments qui ne peuvent pas être désactivés avant de faire confiance à la propriété disabled.
		// Certaines victimes se font prendre dans nos filets (étiquette, légende, menu, piste), mais il ne faut pas
		// existent même sur eux, et encore moins ont une valeur booléenne.
		} else if ( "étiquette" dans elem ) {
			return elem.disabled === désactivé ;
		}

		// Les éléments restants ne sont ni :enabled ni :disabled
		retourner faux ;
	} ;
}

/**
 * Renvoie une fonction à utiliser dans les pseudos pour les positionnels
 * @param {Fonction} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( fonction( argument ) {
		argument = +argument ;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.longueur ;

			// Faire correspondre les éléments trouvés aux index spécifiés
			alors que je-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					graine[ j ] = !( correspond à[ j ] = graine[ j ] );
				}
			}
		} );
	} );
}

/**
 * Vérifie la validité d'un nœud en tant que contexte Sizzle
 * @param {Élément|Objet=} contexte
 * @returns {Element|Object|Boolean} Le nœud d'entrée si acceptable, sinon une valeur fausse
 */
fonction testContext( contexte ) {
	renvoie le contexte && type de contexte.getElementsByTagName !== "undefined" && context;
}

// Expose les variables de support pour plus de commodité
support = Sizzle.support = {} ;

/**
 * Détecte les nœuds XML
 * @param {Element|Objet} elem Un élément ou un document
 * @returns {Boolean} Vrai ssi elem est un nœud XML non-HTML
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem && elem.namespaceURI,
		docElem = elem && ( elem.ownerDocument || elem ).documentElement;

	// Prise en charge : IE <=8
	// Suppose HTML lorsque documentElement n'existe pas encore, comme à l'intérieur du chargement des iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
} ;

/**
 * Définit les variables liées au document une fois en fonction du document actuel
 * @param {Element|Object} [doc] Un élément ou un objet document à utiliser pour définir le document
 * @returns {Object} Renvoie le document courant
 */
setDocument = Sizzle.setDocument = fonction (nœud) {
	var hasCompare, subWindow,
		doc = nœud ? node.ownerDocument || nœud : doc préféré ;

	// Renvoyer plus tôt si le document est invalide ou déjà sélectionné
	// Prise en charge : IE 11+, Edge 17 - 18+
	// IE/Edge génère parfois une erreur "Autorisation refusée" lors d'une comparaison stricte
	// deux documents ; les comparaisons superficielles fonctionnent.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		document de retour ;
	}

	// Mettre à jour les variables globales
	document = doc;
	docElem = document.documentElement;
	documentEstHTML = !estXML( document );

	// Prise en charge : IE 9 - 11+, Edge 12 - 18+
	// L'accès aux documents iframe après le déchargement génère des erreurs "autorisation refusée" (jQuery #13936)
	// Prise en charge : IE 11+, Edge 17 - 18+
	// IE/Edge génère parfois une erreur "Autorisation refusée" lors d'une comparaison stricte
	// deux documents ; les comparaisons superficielles fonctionnent.
	// eslint-disable-next-line eqeqeq
	si ( preferedDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Prise en charge : IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Prise en charge : IE 9 - 10 uniquement
		} sinon si ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	// Prise en charge : IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 uniquement, Firefox <=3.6 - 31 uniquement,
	// Safari 4 - 5 uniquement, Opera <=11.6 - 12.x uniquement
	// Les navigateurs IE/Edge et plus anciens ne prennent pas en charge la pseudo-classe :scope.
	// Prise en charge : Safari 6.0 uniquement
	// Safari 6.0 prend en charge :scope mais c'est un alias de :root ici.
	support.scope = assert( fonction( el ) {
		docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
		return typeof el.querySelectorAll !== "undefined" &&
			!el.querySelectorAll( ":scope fieldset div" ).length;
	} );

	/* Les attributs
	-------------------------------------------------- -------------------- */

	// Prise en charge : Internet Explorer<8
	// Vérifier que getAttribute renvoie bien des attributs et non des propriétés
	// (sauf les booléens IE8)
	support.attributes = assert( fonction( el ) {
		el.className = "je" ;
		return !el.getAttribute( "className" );
	} );

	/* getElement(s)By*
	-------------------------------------------------- -------------------- */

	// Vérifie si getElementsByTagName("*") renvoie uniquement des éléments
	support.getElementsByTagName = assert( fonction( el ) {
		el.appendChild( document.createComment( "" ) );
		return !el.getElementsByTagName( "*" ).length;
	} );

	// Prise en charge : IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Prise en charge : Internet Explorer<10
	// Vérifie si getElementById renvoie les éléments par nom
	// Les méthodes getElementById cassées ne récupèrent pas les noms définis par programme,
	// utilisez donc un test getElementsByName détourné
	support.getById = assert( fonction( el ) {
		docElem.appendChild( el ).id = expando;
		retourner !document.getElementsByName || !document.getElementsByName( expando ).length;
	} );

	// Filtre d'ID et recherche
	si ( support.getById ) {
		Expr.filter[ "ID" ] = fonction( id ) {
			var attrId = id.replace( runescape, funescape );
			fonction de retour (élément) {
				return elem.getAttribute( "id" ) === attrId ;
			} ;
		} ;
		Expr.find[ "ID" ] = fonction( id, contexte ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				élément de retour ? [ élém ] : [] ;
			}
		} ;
	} autre {
		Expr.filter[ "ID" ] = fonction( id ) {
			var attrId = id.replace( runescape, funescape );
			fonction de retour (élément) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				nœud de retour && node.value === attrId ;
			} ;
		} ;

		// Prise en charge : IE 6 - 7 uniquement
		// getElementById n'est pas fiable comme raccourci de recherche
		Expr.find[ "ID" ] = fonction( id, contexte ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				nœud var, je, éléments,
					elem = context.getElementById( id );

				si (élément) {

					// Vérifier l'attribut id
					nœud = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						retour [élément] ;
					}

					// Repli sur getElementsByName
					elems = context.getElementsByName( id );
					je = 0 ;
					tandis que ( ( elem = elems[ i++ ] ) ) {
						nœud = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							retour [élément] ;
						}
					}
				}

				retourner [];
			}
		} ;
	}

	// Étiqueter
	Expr.find[ "TAG" ] = support.getElementsByTagName ?
		fonction (balise, contexte) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// Les nœuds DocumentFragment n'ont pas de gEBTN
			} sinon si ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		fonction (balise, contexte) {
			var élément,
				tmp = [],
				je = 0,

				// Par une heureuse coïncidence, un gEBTN (cassé) apparaît également sur les nœuds DocumentFragment
				résultats = context.getElementsByTagName( tag );

			// Filtrer les commentaires possibles
			si ( balise === "*" ) {
				tandis que ( ( elem = résultats[ i++ ] ) ) {
					si ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				retourner tmp ;
			}
			retourner les résultats ;
		} ;

	// Classer
	Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	} ;

	/* QSA/matchesSelector
	-------------------------------------------------- -------------------- */

	// Prise en charge de QSA et de matchesSelector

	// matchesSelector(:active) renvoie false lorsque true (IE9/Opera 11.5)
	rbuggyMatches = [] ;

	// qSa(:focus) renvoie faux quand vrai (Chrome 21)
	// Nous autorisons cela à cause d'un bogue dans IE8/9 qui renvoie une erreur
	// chaque fois que `document.activeElement` est accédé sur un iframe
	// Donc, nous autorisons :focus à passer par QSA tout le temps pour éviter l'erreur IE
	// Voir https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [] ;

	if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

		// Construire la regex QSA
		// Stratégie Regex adoptée par Diego Perini
		assert( fonction( el ) {

			entrée var ;

			// Select est défini sur une chaîne vide à dessein
			// C'est pour tester le traitement par IE de pas explicitement
			// définition d'un attribut de contenu booléen,
			// puisque sa présence devrait suffire
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>" ;

			// Prise en charge : IE8, Opera 11-12.16
			// Rien ne doit être sélectionné lorsque des chaînes vides suivent ^= ou $= ou *=
			// L'attribut test doit être inconnu dans Opera mais "sûr" pour WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
				rbuggyQSA.push( "[*^$]=" + espace + "*(?:''|\"\")" );
			}

			// Prise en charge : IE8
			// Les attributs booléens et la "valeur" ne sont pas traités correctement
			if ( !el.querySelectorAll( "[sélectionné]" ).length ) {
				rbuggyQSA.push( "\\[" + espace + "*(?:value|" + booléens + ")" );
			}

			// Prise en charge : Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Prise en charge : IE 11+, Edge 15 - 18+
			// IE 11/Edge ne trouve pas d'éléments sur une requête `[name='']` dans certains cas.
			// Ajout d'un attribut temporaire au document avant que la sélection ne fonctionne
			// autour du problème.
			// Fait intéressant, IE 10 et plus ne semblent pas avoir le problème.
			entrée = document.createElement( "entrée" );
			input.setAttribute( "nom", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[nom='']" ).length ) {
				rbuggyQSA.push( "\\[" + espace + "*nom" + espace + "*=" +
					espace + "*(?:''|\"\")" );
			}

			// Webkit/Opera - :checked doit renvoyer les éléments d'option sélectionnés
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 génère une erreur ici et ne verra pas les tests ultérieurs
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":vérifié" );
			}

			// Prise en charge : Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// Dans la page `selector#id sibling-combinator selector` échoue
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Prise en charge : Firefox <=3.6 - 5 uniquement
			// L'ancien Firefox ne lance pas un identifiant mal échappé.
			el.querySelectorAll( "\\\f" );
			rbuggyQSA.push( "[\\r\\n\\f]" );
		} );

		assert( fonction( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>" ;

			// Prise en charge : applications natives Windows 8
			// Les attributs type et name sont restreints lors de l'affectation .innerHTML
			var input = document.createElement( "input" );
			input.setAttribute( "type", "caché" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Prise en charge : IE8
			// Appliquer la sensibilité à la casse de l'attribut name
			if ( el.querySelectorAll( "[nom=d]" ).length ) {
				rbuggyQSA.push( "nom" + espace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - éléments :enabled/:disabled et cachés (les éléments cachés sont toujours activés)
			// IE8 génère une erreur ici et ne verra pas les tests ultérieurs
			if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Prise en charge : IE9-11+
			// Le sélecteur désactivé d'IE ne récupère pas les enfants des ensembles de champs désactivés
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Prise en charge : Opera 10 - 11 uniquement
			// Opera 10-11 ne lance pas de pseudos invalides post-virgule
			el.querySelectorAll( "*,:x" );
			rbuggyQSA.push( ",.*:" );
		} );
	}

	if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector ) ) ) ) {

		assert( fonction( el ) {

			// Vérifie s'il est possible de faire matchesSelector
			// sur un noeud déconnecté (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// Cela devrait échouer avec une exception
			// Gecko ne fait pas d'erreur, renvoie false à la place
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos);
		} );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

	/* Contient
	-------------------------------------------------- -------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// L'élément contient un autre
	// Volontairement auto-exclusif
	// Comme dans, un élément ne se contient pas
	contient = hasCompare || rnative.test( docElem.contains ) ?
		fonction( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			renvoie un === bup || !!( bup && bup.nodeType === 1 && (
				adown.contient ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			) );
		} :
		fonction( a, b ) {
			si ( b ) {
				tandis que ( ( b = b.parentNode ) ) {
					si ( b === une ) {
						retourner vrai ;
					}
				}
			}
			retourner faux ;
		} ;

	/* Tri
	-------------------------------------------------- -------------------- */

	// Tri de l'ordre des documents
	sortOrder = hasCompare ?
	fonction( a, b ) {

		// Indicateur de suppression des doublons
		si ( une === b ) {
			aDuplique = vrai;
			renvoie 0 ;
		}

		// Trier sur l'existence de la méthode si une seule entrée a compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition ;
		si (comparer) {
			retour comparer;
		}

		// Calcule la position si les deux entrées appartiennent au même document
		// Prise en charge : IE 11+, Edge 17 - 18+
		// IE/Edge génère parfois une erreur "Autorisation refusée" lors d'une comparaison stricte
		// deux documents ; les comparaisons superficielles fonctionnent.
		// eslint-disable-next-line eqeqeq
		comparer = ( a.ownerDocument || une ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Sinon, nous savons qu'ils sont déconnectés
			1;

		// Nœuds déconnectés
		si ( comparer & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === comparer ) ) {

			// Choisissez le premier élément qui est lié à notre document préféré
			// Prise en charge : IE 11+, Edge 17 - 18+
			// IE/Edge génère parfois une erreur "Autorisation refusée" lors d'une comparaison stricte
			// deux documents ; les comparaisons superficielles fonctionnent.
			// eslint-disable-next-line eqeqeq
			if ( a == document || a.ownerDocument == preferedDoc &&
				contient( preferedDoc, a ) ) {
				retour -1 ;
			}

			// Prise en charge : IE 11+, Edge 17 - 18+
			// IE/Edge génère parfois une erreur "Autorisation refusée" lors d'une comparaison stricte
			// deux documents ; les comparaisons superficielles fonctionnent.
			// eslint-disable-next-line eqeqeq
			if ( b == document || b.ownerDocument == preferedDoc &&
				contient( docpréféré, b ) ) {
				retour 1 ;
			}

			// Conserver la commande d'origine
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0 ;
		}

		retour comparer & 4 ? -1 : 1 ;
	} :
	fonction( a, b ) {

		// Sortie anticipée si les nœuds sont identiques
		si ( une === b ) {
			aDuplique = vrai;
			renvoie 0 ;
		}

		var cur,
			je = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ une ],
			pb = [ b ] ;

		// Les nœuds sans parents sont soit des documents soit déconnectés
		si ( !aup || !bup ) {

			// Prise en charge : IE 11+, Edge 17 - 18+
			// IE/Edge génère parfois une erreur "Autorisation refusée" lors d'une comparaison stricte
			// deux documents ; les comparaisons superficielles fonctionnent.
			/* eslint-disable eqeqeq */
			retourner un == document ? -1 :
				b == document ? 1 :
				/* eslint-enable eqeqeq */
				hop ? -1 :
				bof ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0 ;

		// Si les nœuds sont frères, nous pouvons faire une vérification rapide
		} sinon si ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Sinon, nous avons besoin de listes complètes de leurs ancêtres pour comparaison
		cur = a ;
		tandis que ( ( cur = cur.parentNode ) ) {
			ap.unshift( cur );
		}
		cur = b;
		tandis que ( ( cur = cur.parentNode ) ) {
			bp.unshift( cur );
		}

		// Descendez l'arbre à la recherche d'un écart
		tandis que ( ap[ je ] === bp[ je ] ) {
			je++ ;
		}

		je reviens ?

			// Effectue une vérification des frères si les nœuds ont un ancêtre commun
			siblingCheck( ap[ i ], bp[ i ] ) :

			// Sinon, les nœuds de notre document sont triés en premier
			// Prise en charge : IE 11+, Edge 17 - 18+
			// IE/Edge génère parfois une erreur "Autorisation refusée" lors d'une comparaison stricte
			// deux documents ; les comparaisons superficielles fonctionnent.
			/* eslint-disable eqeqeq */
			ap[ i ] == preferedDoc ? -1 :
			bp[ i ] == preferedDoc ? 1 :
			/* eslint-enable eqeqeq */
			0 ;
	} ;

	document de retour ;
} ;

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
} ;

Sizzle.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	si ( support.matchesSelector && documentEstHTML &&
		!nonnativeSelectorCache[ expression + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {

		essayer {
			var ret = matches.call( elem, expr );

			// MatchSelector d'IE 9 renvoie false sur les nœuds déconnectés
			if ( ret || support.disconnectedMatch ||

				// De même, les nœuds déconnectés sont dits être dans un document
				// fragment dans IE 9
				elem.document && elem.document.nodeType !== 11 ) {
				retour ret;
			}
		} attraper ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
} ;

Sizzle.contains = function( context, elem ) {

	// Définissez les variables du document si nécessaire
	// Prise en charge : IE 11+, Edge 17 - 18+
	// IE/Edge génère parfois une erreur "Autorisation refusée" lors d'une comparaison stricte
	// deux documents ; les comparaisons superficielles fonctionnent.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || contexte ) != document ) {
		setDocument(contexte);
	}
	return contains( context, elem );
} ;

Sizzle.attr = fonction( élément, nom ) {

	// Définissez les variables du document si nécessaire
	// Prise en charge : IE 11+, Edge 17 - 18+
	// IE/Edge génère parfois une erreur "Autorisation refusée" lors d'une comparaison stricte
	// deux documents ; les comparaisons superficielles fonctionnent.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ nom.toLowerCase() ],

		// Ne vous laissez pas berner par les propriétés Object.prototype (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( élément, nom, !documentEstHTML ) :
			indéfini;

	valeur de retour !== indéfini ?
		val :
		support.attributs || !documentEstHTML ?
			elem.getAttribute( nom ) :
			( val = elem.getAttributeNode( name ) ) && val.specified ?
				val.value :
				nul;
} ;

Sizzle.escape = fonction (sel) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
} ;

Sizzle.error = fonction (msg) {
	throw new Error( "Erreur de syntaxe, expression non reconnue : " + msg );
} ;

/**
 * Tri des documents et suppression des doublons
 * @param {ArrayLike} résultats
 */
Sizzle.uniqueSort = fonction (résultats) {
	var élément,
		doublons = [],
		j = 0,
		je = 0 ;

	// Sauf si nous * savons * que nous pouvons détecter les doublons, supposons leur présence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && résultats.slice( 0 );
	résultats.sort( sortOrder );

	si ( aDuplique ) {
		tandis que ( ( elem = résultats[ i++ ] ) ) {
			si ( elem === résultats[ je ] ) {
				j = doublons.push( je );
			}
		}
		tandis que ( j-- ) {
			résultats.splice( doublons[ j ], 1 );
		}
	}

	// Effacer l'entrée après le tri pour libérer les objets
	// Voir https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	retourner les résultats ;
} ;

/**
 * Fonction utilitaire pour récupérer la valeur textuelle d'un tableau de nœuds DOM
 * @param {Tableau|Élément} élément
 */
getText = Sizzle.getText = fonction (élément) {
	nœud var,
		ret = "",
		je = 0,
		nodeType = elem.nodeType;

	si ( !NodeType ) {

		// S'il n'y a pas de nodeType, cela devrait être un tableau
		tandis que ( ( nœud = elem[ i++ ] ) ) {

			// Ne traverse pas les nœuds de commentaire
			ret += getText( nœud );
		}
	} sinon si ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

		// Utiliser textContent pour les éléments
		// Utilisation de innerText supprimée pour la cohérence des nouvelles lignes (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent ;
		} autre {

			// Traverser ses enfants
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( élém );
			}
		}
	} sinon si ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue ;
	}

	// N'incluez pas les nœuds de commentaires ou d'instructions de traitement

	retour ret;
} ;

Expr = Sizzle.selectors = {

	// Peut être ajusté par l'utilisateur
	cacheLongueur : 50,

	createPseudo : markFunction,

	match: matchExpr,

	attrHandle : {},

	trouver: {},

	parent : {
		">": { répertoire : "parentNode", premier : vrai },
		" " : { répertoire : "parentNode" },
		"+": { répertoire : "previousSibling", premier : vrai },
		"~": { répertoire : "previousSibling" }
	},

	préfiltre : {
		"ATTR": fonction (correspondance) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Déplace la valeur donnée vers match[3] qu'elle soit entre guillemets ou non
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
				match[ 5 ] || "" ).replace( runescape, funescape );

			si ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		"ENFANT": fonction (correspondance) {

			/* correspondances de matchExpr["CHILD"]
				1 type (uniquement|nième|...)
				2 quoi (enfant|de-type)
				3 argument (pair|impair|\d*|\d*n([+-]\d+)?|...)
				4 xn-composant de l'argument xn+y ([+-]?\d*n|)
				5 signe de la composante xn
				6 x du composant xn
				7 signe de la composante y
				8 y de composant y
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			si ( match[ 1 ].slice( 0, 3 ) === "nième" ) {

				// nième-* nécessite un argument
				si ( !match[ 3 ] ) {
					Sizzle.error( match[ 0 ] );
				}

				// paramètres numériques x et y pour Expr.filter.CHILD
				// rappelez-vous que false/true est converti respectivement en 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "pair" || match[ 3 ] === "impair" ) );
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "impair" );

				// les autres types interdisent les arguments
			} sinon si ( match[ 3 ] ) {
				Sizzle.error( match[ 0 ] );
			}

			revanche;
		},

		"PSEUDO": fonction (correspondance) {
			excès de var,
				sans guillemets = !match[ 6 ] && match[ 2 ];

			if ( matchExpr[ "ENFANT" ].test( match[ 0 ] ) ) {
				renvoie nul ;
			}

			// Accepte les arguments entre guillemets tels quels
			si ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "" ;

			// Supprime les caractères en excès des arguments sans guillemets
			} else if ( sans guillemets && rpseudo.test( sans guillemets ) &&

				// Récupère l'excédent de tokenize (récursivement)
				( excès = tokenize( sans guillemets, vrai ) ) &&

				// avance à la prochaine parenthèse fermante
				( excès = unquoted.indexOf( ")", unquoted.length - excès ) - unquoted.length ) ) {

				// l'excès est un indice négatif
				match[ 0 ] = match[ 0 ].slice( 0, excès );
				match[ 2 ] = unquoted.slice( 0, excès );
			}

			// Renvoie uniquement les captures nécessaires à la méthode du pseudo filtre (type et argument)
			return match.slice( 0, 3 );
		}
	},

	filtre : {

		"TAG": fonction( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				une fonction() {
					retourner vrai ;
				} :
				fonction (élément) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				} ;
		},

		"CLASS": fonction( nomClasse ) {
			var pattern = classCache[ className + " " ] ;

			modèle de retour ||
				( pattern = new RegExp( "(^|" + espace +
					")" + nom_classe + "(" + espace + "|$)" ) ) && classCache(
						nom_classe, fonction( elem ) {
							retourner motif.test(
								typeof elem.className === "chaîne" && elem.className ||
								typeof elem.getAttribute !== "non défini" &&
									elem.getAttribute( "classe" ) ||
								""
							);
				} );
		},

		"ATTR": fonction( nom, opérateur, vérification ) {
			fonction de retour (élément) {
				var result = Sizzle.attr( elem, name );

				si ( résultat == null ) {
					opérateur de retour === "!=" ;
				}
				si ( !opérateur ) {
					retourner vrai ;
				}

				résultat += "" ;

				/* eslint-disable max-len */

				opérateur de retour === "=" ? résultat === vérifier :
					opérateur === "!=" ? résultat !== vérifier :
					opérateur === "^=" ? vérifier && result.indexOf( vérifier ) === 0 :
					opérateur === "*=" ? vérifier && result.indexOf( vérifier ) > -1 :
					opérateur === "$=" ? vérifier && result.slice( -check.length ) === vérifier :
					opérateur === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					opérateur === "|=" ? résultat === vérifier || result.slice( 0, check.length + 1 ) === check + "-" :
					faux;
				/* eslint-enable max-len */

			} ;
		},

		"ENFANT": fonction( type, quoi, _argument, premier, dernier ) {
			var simple = type.slice( 0, 3 ) !== "nième",
				avant = type.tranche( -4 ) !== "dernier",
				ofType = quoi === "de-type" ;

			retourner premier === 1 && dernier === 0 ?

				// Raccourci pour :nth-*(n)
				fonction (élément) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, uniqueCache, outerCache, nœud, nodeIndex, début,
						dir = simple !== avant ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						nom = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = faux ;

					si (parent) {

						// :(premier|dernier|uniquement)-(enfant|du-type)
						si (simple) {
							tandis que (répertoire) {
								nœud = élément ;
								tandis que ( ( nœud = nœud[ répertoire ] ) ) {
									si (deType ?
										node.nodeName.toLowerCase() === nom :
										nœud.nodeType === 1 ) {

										retourner faux ;
									}
								}

								// Sens inverse pour :only-* (si nous ne l'avons pas encore fait)
								start = dir = type === "uniquement" && !start && "nextSibling" ;
							}
							retourner vrai ;
						}

						début = [ avant ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stocke les données du cache sur `parent`
						si ( avant && useCache ) {

							// Recherche `elem` à partir d'un index précédemment mis en cache

							// ... d'une manière compatible avec gzip
							nœud = parent ;
							outerCache = node[ expando ] || ( node[ expando ] = {} );

							// Prise en charge : IE <9 uniquement
							// Se défendre contre les attaques clonées (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								( outerCache[ node.uniqueID ] = {} );

							cache = uniqueCache[ type ] || [] ;
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							tandis que ( ( nœud = ++nodeIndex && nœud && nœud[ répertoire ] ||

								// Retour à la recherche de `elem` depuis le début
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// Lorsqu'il est trouvé, met en cache les index sur `parent` et casse
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ] ;
									Pause;
								}
							}

						} autre {

							// Utilise l'index d'élément précédemment mis en cache s'il est disponible
							si (useCache) {

								// ... d'une manière compatible avec gzip
								nœud = élément ;
								outerCache = node[ expando ] || ( node[ expando ] = {} );

								// Prise en charge : IE <9 uniquement
								// Se défendre contre les attaques clonées (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									( outerCache[ node.uniqueID ] = {} );

								cache = uniqueCache[ type ] || [] ;
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex ;
							}

							// xml :nth-enfant(...)
							// ou :nth-dernier-enfant(...) ou :nth(-dernier)?-de-type(...)
							si ( diff === faux ) {

								// Utilisez la même boucle que ci-dessus pour rechercher `elem` depuis le début
								tandis que ( ( nœud = ++nodeIndex && nœud && nœud[ répertoire ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									si ( ( deType ?
										node.nodeName.toLowerCase() === nom :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache l'index de chaque élément rencontré
										si (useCache) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );

											// Prise en charge : IE <9 uniquement
											// Se défendre contre les attaques clonées (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												( outerCache[ node.uniqueID ] = {} );

											uniqueCache[ type ] = [ dirruns, diff ] ;
										}

										si ( nœud === élément ) {
											Pause;
										}
									}
								}
							}
						}

						// Incorporer le décalage, puis vérifier la taille du cycle
						diff -= dernier ;
						return diff === premier || ( diff % premier === 0 && diff / premier >= 0 );
					}
				} ;
		},

		"PSEUDO": fonction( pseudo, argument ) {

			// les noms de pseudo-classes sont insensibles à la casse
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioriser par sensibilité à la casse au cas où des pseudos personnalisés seraient ajoutés avec des lettres majuscules
			// Rappelez-vous que setFilters hérite des pseudos
			var arguments,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "pseudo non pris en charge : " + pseudo );

			// L'utilisateur peut utiliser createPseudo pour indiquer que
			// des arguments sont nécessaires pour créer la fonction de filtrage
			// comme le fait Sizzle
			si ( fn[ développer ] ) {
				retourner fn( argument );
			}

			// Mais conserve le support des anciennes signatures
			si ( longueur fn > 1 ) {
				args = [ pseudo, pseudo, "", argument ] ;
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( fonction( seed, matches ) {
						var idx,
							matched = fn( graine, argument ),
							i = longueur.correspondante ;
						alors que je-- ) {
							idx = indexOf( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					fonction (élément) {
						return fn( elem, 0, args );
					} ;
			}

			retour fn ;
		}
	},

	pseudos : {

		// Pseudos potentiellement complexes
		"not": markFunction( fonction( sélecteur ) {

			// Découpe le sélecteur passé à compiler
			// pour éviter de traiter le début et la fin
			// espaces comme combinateurs
			var entrée = [],
				résultats = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction( fonction( seed, matches, _context, xml ) {
					var élément,
						inégalé = matcher( graine, null, xml, [] ),
						i = graine.longueur ;

					// Correspondance des éléments sans correspondance par `matcher`
					alors que je-- ) {
						si ( ( elem = sans correspondance[ je ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					entrée[ 0 ] = élément ;
					matcher( entrée, null, xml, résultats );

					// Ne garde pas l'élément (problème #299)
					entrée[ 0 ] = null ;
					return !results.pop();
				} ;
		} ),

		"a": markFunction( fonction( sélecteur ) {
			fonction de retour (élément) {
				return Sizzle( selector, elem ).length > 0;
			} ;
		} ),

		"contient": markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			fonction de retour (élément) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			} ;
		} ),

		// "Si un élément est représenté par un sélecteur :lang()
		// est basé uniquement sur la valeur de langue de l'élément
		// étant égal à l'identifiant C,
		// ou commençant par l'identifiant C immédiatement suivi de "-".
		// La correspondance de C avec la valeur de langage de l'élément est effectuée sans tenir compte de la casse.
		// L'identifiant C n'a pas besoin d'être un nom de langue valide."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( fonction( lang ) {

			// la valeur lang doit être un identifiant valide
			if ( !ridentifier.test( lang || "" ) ) {
				Sizzle.error( "langue non prise en charge : " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			fonction de retour (élément) {
				var elemLang ;
				fais {
					si ( ( elemLang = documentEstHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} tandis que ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				retourner faux ;
			} ;
		} ),

		// Divers
		"cible": fonction (élément) {
			var hash = window.location && window.location.hash;
			retourner le hachage && hash.slice( 1 ) === elem.id;
		},

		"racine": fonction (élément) {
			return elem === docElem ;
		},

		"focus": fonction (élément) {
			retour élément === document.activeElement &&
				( !document.hasFocus || document.hasFocus() ) &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Propriétés booléennes
		"enabled": createDisabledPseudo( false ),
		"désactivé": createDisabledPseudo( true ),

		"vérifié": function( elem ) {

			// En CSS3, :checked doit renvoyer à la fois les éléments cochés et sélectionnés
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return ( nodeName === "input" && !!elem.checked ) ||
				( nodeName === "option" && !!elem.selected );
		},

		"sélectionné": fonction (élément) {

			// L'accès à cette propriété rend la sélection par défaut
			// les options de Safari fonctionnent correctement
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex ;
			}

			return elem.selected === vrai ;
		},

		// Contenu
		"vide": fonction (élément) {

			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty est annulé par l'élément (1) ou les nœuds de contenu (text : 3 ; cdata : 4 ; entity ref : 5),
			// mais pas par d'autres (commentaire : 8 ; instruction de traitement : 7 ; etc.)
			// nodeType < 6 fonctionne car les attributs (2) n'apparaissent pas comme enfants
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					retourner faux ;
				}
			}
			retourner vrai ;
		},

		"parent": fonction (élément) {
			return !Expr.pseudos[ "vide" ]( elem );
		},

		// Types d'élément/d'entrée
		"en-tête": fonction (élément) {
			return rheader.test( elem.nodeName );
		},

		"entrée": fonction (élément) {
			return rinputs.test( elem.nodeName );
		},

		"bouton": fonction (élément) {
			var nom = elem.nodeName.toLowerCase();
			return name === "entrée" && elem.type === "bouton" || nom === "bouton" ;
		},

		"texte": fonction (élément) {
			attribut var ;
			return elem.nodeName.toLowerCase() === "entrée" &&
				elem.type === "texte" &&

				// Prise en charge : Internet Explorer<8
				// Les nouvelles valeurs d'attribut HTML5 (par exemple, "search") apparaissent avec elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "texte" );
		},

		// Position dans la collection
		"premier": createPositionalPseudo( fonction() {
			retour [ 0 ] ;
		} ),

		"dernier": createPositionalPseudo( fonction( _matchIndexes, longueur ) {
			return [ longueur - 1 ] ;
		} ),

		"eq": createPositionalPseudo( fonction( _matchIndexes, longueur, argument) {
			retour [ argument < 0 ? argument + longueur : argument ] ;
		} ),

		"even": createPositionalPseudo( function( matchIndexes, length ) {
			var je = 0 ;
			pour ( ; je < longueur; je += 2 ) {
				matchIndexes.push( i );
			}
			renvoie les index de correspondance ;
		} ),

		"impair": createPositionalPseudo( function( matchIndexes, length ) {
			var je = 1 ;
			pour ( ; je < longueur; je += 2 ) {
				matchIndexes.push( i );
			}
			renvoie les index de correspondance ;
		} ),

		"lt": createPositionalPseudo( fonction( matchIndexes, longueur, argument ) {
			var je = argument < 0 ?
				argument + longueur :
				argument > longueur ?
					longueur :
					argument;
			pour (; --i >= 0; ) {
				matchIndexes.push( i );
			}
			renvoie les index de correspondance ;
		} ),

		"gt": createPositionalPseudo( fonction( matchIndexes, longueur, argument ) {
			var je = argument < 0 ? argument + longueur : argument;
			pour (; ++i < longueur; ) {
				matchIndexes.push( i );
			}
			renvoie les index de correspondance ;
		} )
	}
} ;

Expr.pseudos[ "nt" ] = Expr.pseudos[ "eq" ];

// Ajouter des pseudos de bouton/type d'entrée
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ je ] = createInputPseudo( je );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ je ] = createButtonPseudo( je );
}

// API facile pour créer de nouveaux setFilters
fonction setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos ;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var apparié, correspondance, jetons, type,
		soFar, groupes, préfiltres,
		mis en cache = tokenCache[ sélecteur + " " ] ;

	si (en cache) {
		retour parseOnly ? 0 : cache.slice( 0 );
	}

	soFar = sélecteur ;
	groupes = [] ;
	preFilters = Expr.preFilter;

	tandis que ( jusqu'à présent ) {

		// Virgule et première exécution
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			si (concordance) {

				// Ne consomme pas les virgules de fin comme valides
				soFar = soFar. tranche( match[ 0 ].length ) || jusque là;
			}
			groupes.push( ( jetons = [] ) );
		}

		correspondant = faux ;

		// Combinateurs
		si ( ( match = rcombinators.exec( jusqu'à présent ) ) ) {
			matched = match.shift();
			jetons.push( {
				valeur : correspondant,

				// Cast des combinateurs descendants dans l'espace
				tapez : match[ 0 ].replace( rtrim, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filtres
		for (tapez dans Expr.filter) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				jetons.push( {
					valeur : correspondant,
					type : type,
					matchs : match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		si ( ! correspond ) {
			Pause;
		}
	}

	// Retourne la longueur de l'excédent invalide
	// si nous ne faisons qu'analyser
	// Sinon, lance une erreur ou renvoie des jetons
	retour parseOnly ?
		soFar.length :
		jusque là ?
			Sizzle.error( selector ) :

			// Cache les jetons
			tokenCache( sélecteur, groupes ).slice( 0 );
} ;

function toSelector( tokens ) {
	var je = 0,
		len = tokens.length,
		sélecteur = "" ;
	pour (; je < longueur; je++ ) {
		selector += tokens[ i ].value;
	}
	sélecteur de retour ;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		sauter = combinateur.suivant,
		clé = sauter || directeur,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Vérification par rapport à l'ancêtre le plus proche/élément précédent
		fonction (élément, contexte, xml) {
			tandis que ( ( elem = elem[ répertoire ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			retourner faux ;
		} :

		// Vérification par rapport à tous les éléments ancêtres/précédents
		fonction (élément, contexte, xml) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// Nous ne pouvons pas définir de données arbitraires sur les nœuds XML, ils ne bénéficient donc pas de la mise en cache du combinateur
			si ( xml ) {
				tandis que ( ( elem = elem[ répertoire ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							retourner vrai ;
						}
					}
				}
			} autre {
				tandis que ( ( elem = elem[ répertoire ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						// Prise en charge : IE <9 uniquement
						// Se défendre contre les attaques clonées (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] ||
							( outerCache[ elem.uniqueID ] = {} );

						if ( sauter && sauter === elem.nodeName.toLowerCase() ) {
							elem = elem[ répertoire ] || élément ;
						} sinon si ( ( oldCache = uniqueCache[ clé ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Attribuer à newCache pour que les résultats se propagent aux éléments précédents
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} autre {

							// Réutiliser newcache pour que les résultats se propagent aux éléments précédents
							uniqueCache[ clé ] = newCache ;

							// Une correspondance signifie que nous avons terminé ; un échec signifie que nous devons continuer à vérifier
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								retourner vrai ;
							}
						}
					}
				}
			}
			retourner faux ;
		} ;
}

function elementMatcher( matchers ) {
	renvoie matchers.length > 1 ?
		fonction (élément, contexte, xml) {
			var i = matchers.length;
			alors que je-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					retourner faux ;
				}
			}
			retourner vrai ;
		} :
		matchers[ 0 ] ;
}

function multipleContexts( selector, contexts, results ) {
	var je = 0,
		len = contextes.longueur ;
	pour (; je < longueur; je++ ) {
		Sizzle( sélecteur, contextes[ i ], résultats );
	}
	retourner les résultats ;
}

function condense( sans correspondance, carte, filtre, contexte, xml ) {
	var élément,
		newUnmatched = [],
		je = 0,
		len = unmatched.length,
		mappé = carte != null;

	pour (; je < longueur; je++ ) {
		si ( ( elem = sans correspondance[ je ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				si ( mappé ) {
					map.push( je );
				}
			}
		}
	}

	renvoie newUnmatched ;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( fonction( graine, résultats, contexte, xml ) {
		var temp, je, elem,
			préCarte = [],
			postCarte = [],
			préexistant = résultats.longueur,

			// Récupère les éléments initiaux à partir de la graine ou du contexte
			éléments = graine || multipleContexts(
				sélecteur || "*",
				contexte.nodeType ? [ contexte ] : contexte,
				[]
			),

			// Préfiltre pour obtenir l'entrée du matcher, en préservant une carte pour la synchronisation des résultats de départ
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				éléments,

			matcherOut = matcher ?

				// Si nous avons un postFinder, ou une graine filtrée, ou un postFilter non graine ou des résultats préexistants,
				postFinder || ( seed ? preFilter : préexistant || postFilter ) ?

					// ... un traitement intermédiaire est nécessaire
					[] :

					// ...sinon utiliser directement les résultats
					résultats :
				matcherIn ;

		// Trouver les correspondances principales
		si (concordance) {
			matcher( matcherIn, matcherOut, contexte, xml );
		}

		// Appliquer le post-filtre
		si ( postFiltre ) {
			temp = condense( matcherOut, postMap );
			postFiltre( temp, [], contexte, xml );

			// Dissocie les éléments défaillants en les replaçant dans matcherIn
			i = temp.longueur ;
			alors que je-- ) {
				si ( ( elem = temp[ je ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		si ( graine ) {
			if ( postFinder || préFiltre ) {
				si ( postFinder ) {

					// Récupère le matcherOut final en condensant cet intermédiaire dans les contextes postFinder
					temp = [] ;
					i = matcherOut.longueur ;
					alors que je-- ) {
						si ( ( elem = matcherOut[ je ] ) ) {

							// Restaurer matcherIn puisque elem n'est pas encore une correspondance finale
							temp.push( ( matcherIn[ je ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Déplacer les éléments correspondants de la graine vers les résultats pour les garder synchronisés
				i = matcherOut.longueur ;
				alors que je-- ) {
					si ( ( elem = matcherOut[ je ] ) &&
						( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

						graine[ temp ] = !( résultats[ temp ] = elem );
					}
				}
			}

		// Ajouter des éléments aux résultats, via postFinder si défini
		} autre {
			matcherOut = condense(
				matcherOut === résultats ?
					matcherOut.splice( préexistant, matcherOut.length ) :
					matcherOut
			);
			si ( postFinder ) {
				postFinder( null, résultats, matcherOut, xml );
			} autre {
				push.apply( résultats, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( jetons ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadRelative = Expr.relative[ tokens[ 0 ].type ],
		impliciteRelative = leadRelative || Expr.relatif[ " " ],
		i = leaderRelative ? dix,

		// Le matcher fondamental garantit que les éléments sont accessibles à partir du ou des contextes de niveau supérieur
		matchContext = addCombinator( fonction( elem ) {
			return elem === checkContext;
		}, impliciteRelatif, vrai ),
		matchAnyContext = addCombinator( fonction( elem ) {
			return indexOf( checkContext, elem ) > -1 ;
		}, impliciteRelatif, vrai ),
		matchers = [ fonction( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || contexte !== outermostContext ) ) || (
				( checkContext = contexte ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Éviter de s'accrocher à l'élément (issue #299)
			checkContext = null;
			retour ret;
		} ] ;

	pour (; je < longueur; je++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} autre {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Renvoie special en voyant un matcher positionnel
			if ( matcher[ expando ] ) {

				// Trouve le prochain opérateur relatif (le cas échéant) pour une manipulation correcte
				j = ++i ;
				pour ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						Pause;
					}
				}
				retourner ensembleMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

					// Si le jeton précédent était un combinateur descendant, insère un élément quelconque implicite `*`
					jetons
						.slice( 0, je - 1 )
						.concat( { valeur : tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrim, "$1" ),
					matcher,
					je < j && matcherFromTokens( jetons. tranche( je, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = fonction (graine, contexte, xml, résultats, le plus à l'extérieur) {
			var elem, j, matcher,
				matchedCount = 0,
				je = "0",
				inégalé = graine && [],
				setMatched = [],
				contextBackup = outermostContext,

				// Nous devons toujours avoir des éléments de départ ou un contexte le plus externe
				éléments = graine || byElement && Expr.find[ "TAG" ]( "*", le plus à l'extérieur ),

				// Utilise des dirruns entiers ssi c'est le matcher le plus externe
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.longueur ;

			si (le plus à l'extérieur) {

				// Prise en charge : IE 11+, Edge 17 - 18+
				// IE/Edge génère parfois une erreur "Autorisation refusée" lors d'une comparaison stricte
				// deux documents ; les comparaisons superficielles fonctionnent.
				// eslint-disable-next-line eqeqeq
				outermostContext = contexte == document || contexte || le plus à l'extérieur ;
			}

			// Ajoute des éléments en passant des elementMatchers directement aux résultats
			// Prise en charge : IE<9, Safari
			// Tolère les propriétés NodeList (IE : "longueur" ; Safari : <nombre>) correspondant aux éléments par identifiant
			for ( ; je !== len && ( elem = elems[ je ] ) != null; je++ ) {
				if ( byElement && elem ) {
					j = 0 ;

					// Prise en charge : IE 11+, Edge 17 - 18+
					// IE/Edge génère parfois une erreur "Autorisation refusée" lors d'une comparaison stricte
					// deux documents ; les comparaisons superficielles fonctionnent.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentEstHTML;
					}
					tandis que ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							résultats.push( elem );
							Pause;
						}
					}
					si (le plus à l'extérieur) {
						dirruns = dirrunsUnique ;
					}
				}

				// Suivre les éléments sans correspondance pour les filtres définis
				si ( parEnsemble ) {

					// Ils auront parcouru tous les matchers possibles
					if ( ( elem = !matcher && elem ) ) {
						matchedCount-- ;
					}

					// Allonge le tableau pour chaque élément, apparié ou non
					si ( graine ) {
						inégalé.push( elem );
					}
				}
			}

			// `i` est maintenant le nombre d'éléments visités ci-dessus, et l'ajoute à `matchedCount`
			// rend ce dernier non négatif.
			matchedCount += i ;

			// Appliquer les filtres définis aux éléments sans correspondance
			// REMARQUE : ceci peut être ignoré s'il n'y a pas d'éléments sans correspondance (par exemple, `matchedCount`
			// est égal à `i`), à moins que nous n'ayons visité _aucun_ élément dans la boucle ci-dessus car nous avons
			// pas de matchers d'éléments et pas de graine.
			// L'incrémentation d'une chaîne initiale "0" `i` permet à `i` de rester une chaîne uniquement dans ce
			// cas, qui se traduira par un "00" `matchedCount` qui diffère de `i` mais est également
			// numériquement zéro.
			if ( bySet && i !== matchedCount ) {
				j = 0 ;
				tandis que ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( sans correspondance, setMatched, context, xml );
				}

				si ( graine ) {

					// Réintègre les correspondances d'éléments pour éliminer le besoin de tri
					si (matchedCount> 0) {
						alors que je-- ) {
							si ( !( sans correspondance[ je ] || setMatched[ je ] ) ) {
								setMatched[ i ] = pop.call( résultats );
							}
						}
					}

					// Ignorer les valeurs d'espace réservé d'index pour obtenir uniquement les correspondances réelles
					setMatched = condense( setMatched );
				}

				// Ajouter des correspondances aux résultats
				push.apply( résultats, setMatched );

				// Les correspondances d'ensemble sans graines succédant à plusieurs correspondances réussies stipulent le tri
				if ( le plus à l'extérieur && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( résultats );
				}
			}

			// Remplace la manipulation des globals par les matchers imbriqués
			si (le plus à l'extérieur) {
				dirruns = dirrunsUnique ;
				outermostContext = contextBackup ;
			}

			retour inégalé;
		} ;

	retour parEnsemble ?
		markFunction( superMatcher ) :
		superMatcher ;
}

compile = Sizzle.compile = function( selector, match /* Usage interne uniquement */ ) {
	var je,
		setMatchers = [],
		elementMatchers = [],
		mis en cache = compilerCache[ sélecteur + " " ] ;

	si ( !caché ) {

		// Génère une fonction de fonctions récursives permettant de vérifier chaque élément
		si ( !match ) {
			match = tokenize( sélecteur );
		}
		i = match.longueur ;
		alors que je-- ) {
			mis en cache = matcherFromTokens( match[ i ] );
			si (caché[expanser]) {
				setMatchers.push( mis en cache );
			} autre {
				elementMatchers.push( mis en cache );
			}
		}

		// Cache la fonction compilée
		mis en cache = compilerCache(
			sélecteur,
			matcherFromGroupMatchers( elementMatchers, setMatchers )
		);

		// Enregistrer le sélecteur et la tokenisation
		cached.selector = sélecteur;
	}
	retour en cache ;
} ;

/**
 * Une fonction de sélection de bas niveau qui fonctionne avec la compilation compilée de Sizzle
 * fonctions de sélecteur
 * @param {String|Function} selector Un sélecteur ou un pré-compilé
 * fonction de sélection construite avec Sizzle.compile
 * contexte @param {Élément}
 * @param {Tableau} [résultats]
 * @param {Array} [seed] Un ensemble d'éléments à comparer
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compilé = typeof sélecteur === "fonction" && sélecteur,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	résultats = résultats || [] ;

	// Essayez de minimiser les opérations s'il n'y a qu'un seul sélecteur dans la liste et pas de graine
	// (ce dernier nous garantit le contexte)
	si ( correspondance.longueur === 1 ) {

		// Réduit le contexte si le premier sélecteur composé est un ID
		jetons = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
			context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			contexte = ( Expr.find[ "ID" ]( token.matches[ 0 ]
				.replace( runescape, funescape ), contexte ) || [] )[ 0 ] ;
			si ( !contexte ) {
				retourner les résultats ;

			// Les matchers précompilés vérifieront toujours l'ascendance, donc montez d'un niveau
			} sinon si (compilé) {
				contexte = contexte.parentNode ;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Récupère un ensemble de graines pour une correspondance de droite à gauche
		i = matchExpr[ "needsContext" ].test( selector ) ? 0 : jetons.longueur ;
		alors que je-- ) {
			jeton = jetons[ je ] ;

			// Abandon si nous touchons un combinateur
			if ( Expr.relative[ ( type = token.type ) ] ) {
				Pause;
			}
			si ( ( trouver = Expr. trouver[ type ] ) ) {

				// Recherche, élargissant le contexte pour les principaux combinateurs frères
				si ( ( graine = trouver(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
						le contexte
				) ) ) {

					// Si la graine est vide ou qu'il ne reste aucun jeton, nous pouvons revenir plus tôt
					tokens.splice( je, 1 );
					selector = seed.length && toSelector( tokens );
					si ( !sélecteur ) {
						push.apply( résultats, graine );
						retourner les résultats ;
					}

					Pause;
				}
			}
		}
	}

	// Compile et exécute une fonction de filtrage si aucune n'est fournie
	// Fournissez `match` pour éviter la retokenisation si nous avons modifié le sélecteur ci-dessus
	( compilé || compile( selector, match ) )(
		planter,
		le contexte,
		!documentEstHTML,
		résultats,
		!contexte || rsibling.test( selector ) && testContext( context.parentNode ) || le contexte
	);
	retourner les résultats ;
} ;

// Devoirs ponctuels

// Stabilité du tri
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando ;

// Prise en charge : Chrome 14-35+
// Suppose toujours les doublons s'ils ne sont pas passés à la fonction de comparaison
support.detectDuplicates = !!hasDuplicate;

// Initialiser par rapport au document par défaut
setDocument();

// Support : Webkit<537.32 - Safari 6.0.3/Chrome 25 (corrigé dans Chrome 27)
// Les nœuds détachés se suivent *l'un l'autre* de façon confuse
support.sortDetached = assert( fonction( el ) {

	// Devrait renvoyer 1, mais renvoie 4 (suivant)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

// Prise en charge : Internet Explorer<8
// Empêche l'"interpolation" d'attribut/propriété
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
si ( !assert( fonction( el ) {
	el.innerHTML = "<a href='#'></a>" ;
	return el.firstChild.getAttribute( "href" ) === "#" ;
} ) ) {
	addHandle( "type|href|hauteur|largeur", function( elem, nom, isXML ) {
		si ( !estXML ) {
			return elem.getAttribute( nom, nom.toLowerCase() === "type" ? 1 : 2 );
		}
	} );
}

// Prise en charge : IE<9
// Utilise defaultValue à la place de getAttribute("value")
if ( !support.attributes || !assert( function( el ) {
	el.innerHTML = "<input/>" ;
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "" ;
} ) ) {
	addHandle( "valeur", function( elem, _name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "entrée" ) {
			return elem.defaultValue ;
		}
	} );
}

// Prise en charge : IE<9
// Utilisez getAttributeNode pour récupérer les booléens lorsque getAttribute se trouve
si ( !assert( fonction( el ) {
	return el.getAttribute( "disabled" ) == null;
} ) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		si ( !estXML ) {
			return elem[ nom ] === vrai ? nom.toLowerCase() :
				( val = elem.getAttributeNode( name ) ) && val.specified ?
					val.value :
					nul;
		}
	} );
}

retour Sizzle;

} )( la fenêtre );



jQuery.find = Sizzle ;
jQuery.expr = Sizzle.selectors ;

// Obsolète
jQuery.expr[ ":" ] = jQuery.expr.pseudos ;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort ;
jQuery.text = Sizzle.getText ;
jQuery.isXMLDoc = Sizzle.isXML ;
jQuery.contains = Sizzle.contains ;
jQuery.escapeSelector = Sizzle.escape ;




var dir = fonction( elem, dir, jusqu'à ) {
	var correspond = [],
		tronquer = jusqu'à !== indéfini ;

	tandis que ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		si ( elem.nodeType === 1 ) {
			if ( tronquer && jQuery( elem ).is( jusqu'à ) ) {
				Pause;
			}
			matched.push( elem );
		}
	}
	retour correspondant ;
} ;


var frères et soeurs = fonction( n, elem ) {
	var correspondant = [] ;

	for (; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	retour correspondant ;
} ;


var rneedsContext = jQuery.expr.match.needsContext ;



fonction nodeName( élément, nom ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var rsingleTag = ( /^<([az][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>( ?:<\/\1>|)$/i );



// Implémenter la fonctionnalité identique pour le filtre et non
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualificateur ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Élément unique
	si ( qualificateur.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualificateur ) !== not;
		} );
	}

	// Arraylike d'éléments (jQuery, arguments, Array)
	if ( typeof qualificateur !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualificateur, elem ) > -1 ) !== not;
		} );
	}

	// Filtré directement pour les sélecteurs simples et complexes
	return jQuery.filter( qualificateur, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	sinon ) {
		expr = ":non(" + expr + ")" ;
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ élém ] : [] ;
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1 ;
	} ) );
} ;

jQuery.fn.extend( {
	trouver : fonction (sélecteur) {
		var je, ret,
			len = this.longueur,
			soi = ceci ;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				pour ( je = 0; je < longueur; je++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						retourner vrai ;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		pour ( je = 0; je < longueur; je++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		retour longueur > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filtre : fonction (sélecteur) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	pas : fonction (sélecteur) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	est : fonction (sélecteur) {
		retour !!vanner(
			ce,

			// S'il s'agit d'un sélecteur positionnel/relatif, vérifie l'appartenance à l'ensemble renvoyé
			// donc $("p:first").is("p:last") ne retournera pas vrai pour un doc avec deux "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( sélecteur ) :
				sélecteur || [],
			faux
		).longueur;
	}
} );


// Initialise un objet jQuery


// Une référence centrale à la racine jQuery(document)
var rootjQuery,

	// Un moyen simple de vérifier les chaînes HTML
	// Prioriser #id sur <tag> pour éviter XSS via location.hash (#9521)
	// Reconnaissance HTML stricte (#11290 : doit commencer par <)
	// Raccourci simple #id case pour la vitesse
	rExprrapide = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = fonction (sélecteur, contexte, racine) {
		correspondance var, élément ;

		// HANDLE : $(""), $(null), $(undefined), $(false)
		si ( !sélecteur ) {
			retournez ceci;
		}

		// La méthode init() accepte un autre rootjQuery
		// donc migrate peut prendre en charge jQuery.sub (gh-2101)
		racine = racine || rootjQuery ;

		// Gérer les chaînes HTML
		if ( typeof selector === "string" ) {
			si ( sélecteur[ 0 ] === "<" &&
				sélecteur[ sélecteur.longueur - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Supposons que les chaînes qui commencent et se terminent par <> sont HTML et ignorent la vérification des expressions régulières
				match = [ null, sélecteur, null ] ;

			} autre {
				match = rquickExpr.exec( sélecteur );
			}

			// Faites correspondre le HTML ou assurez-vous qu'aucun contexte n'est spécifié pour #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// POIGNEE : $(html) -> $(tableau)
				si ( match[ 1 ] ) {
					contexte = contexte instance de jQuery ? contexte[ 0 ] : contexte ;

					// L'option d'exécution des scripts est vraie pour la rétrocompatibilité
					// Laisse intentionnellement l'erreur être générée si parseHTML n'est pas présent
					jQuery.merge( ceci, jQuery.parseHTML(
						match[ 1 ],
						contexte && contexte.nodeType ? context.ownerDocument || contexte : document,
						vrai
					) );

					// POIGNÉE : $(html, accessoires)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( correspondance dans le contexte ) {

							// Les propriétés du contexte sont appelées comme des méthodes si possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ... et autrement défini comme attributs
							} autre {
								this.attr( correspondance, contexte[ correspondance ] );
							}
						}
					}

					retournez ceci;

				// POIGNEE : $(#id)
				} autre {
					elem = document.getElementById( match[ 2 ] );

					si (élément) {

						// Injecte l'élément directement dans l'objet jQuery
						this[ 0 ] = elem ;
						this.length = 1;
					}
					retournez ceci;
				}

			// POIGNÉE : $(expr, $(...))
			} sinon si ( !context || contexte.jquery ) {
				return ( contexte || racine ).find( selector );

			// POIGNÉE : $(expr, contexte)
			// (qui est juste équivalent à : $(context).find(expr)
			} autre {
				return this.constructor( context ).find( selector );
			}

		// POIGNÉE : $(ÉlémentDOME)
		} sinon si ( selector.nodeType ) {
			this[ 0 ] = sélecteur ;
			this.length = 1;
			retournez ceci;

		// POIGNEE : $(fonction)
		// Raccourci pour le document prêt
		} sinon si (estFonction(sélecteur)) {
			renvoie root.ready !== non défini ?
				root.ready( sélecteur ) :

				// Exécuter immédiatement si ready n'est pas présent
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	} ;

// Donne à la fonction init le prototype jQuery pour une instanciation ultérieure
init.prototype = jQuery.fn;

// Initialiser la référence centrale
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Jusqu'à|Tous))/,

	// Méthodes garanties pour produire un ensemble unique en partant d'un ensemble unique
	garantiUnique = {
		enfants : vrai,
		contenu : vrai,
		suivant : vrai,
		précédent : vrai
	} ;

jQuery.fn.extend( {
	a : fonction (cible) {
		var cibles = jQuery( cible, ceci ),
			l = cibles.longueur ;

		return this.filter( fonction() {
			var je = 0 ;
			pour (; je < l; je++ ) {
				if ( jQuery.contains( this, target[ i ] ) ) {
					retourner vrai ;
				}
			}
		} );
	},

	le plus proche : fonction( sélecteurs, contexte ) {
		var cur,
			je = 0,
			l = cette.longueur,
			correspondant = [],
			cibles = typede sélecteurs !== "chaîne" && jQuery( sélecteurs );

		// Les sélecteurs positionnels ne correspondent jamais, puisqu'il n'y a pas de contexte _selection_
		if ( !rneedsContext.test( selectors ) ) {
			pour (; je < l; je++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Ignore toujours les fragments de document
					if ( cur.nodeType < 11 && ( cibles ?
						cibles.index( cur ) > -1 :

						// Ne passe pas les non-éléments à Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, sélecteurs ) ) ) {

						matched.push( cur );
						Pause;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Détermine la position d'un élément dans l'ensemble
	index : fonction (élément) {

		// Aucun argument, renvoie l'index dans le parent
		si ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index dans le sélecteur
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Localise la position de l'élément désiré
		return indexOf.call( this,

			// S'il reçoit un objet jQuery, le premier élément est utilisé
			elem.jquery ? élément[ 0 ] : élément
		);
	},

	ajouter : fonction (sélecteur, contexte) {
		retourne this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack : fonction (sélecteur) {
		renvoie this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

fonction frère( cur, dir ) {
	tandis que ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	retour courant ;
}

jQuery.each( {
	parent : fonction (élément) {
		var parent = elem.parentNode;
		renvoie le parent && parent.nodeType !== 11 ? père : nul ;
	},
	parents : fonction (élément) {
		return dir( elem, "parentNode" );
	},
	parentsJusqu'à : function( elem, _i, until ) {
		return dir( elem, "parentNode", jusqu'à );
	},
	suivant : fonction (élément) {
		return sibling( elem, "nextSibling" );
	},
	précédent : fonction (élément) {
		return sibling( elem, "previousSibling" );
	},
	suivantTout : fonction (élément) {
		return dir( elem, "nextSibling" );
	},
	prevAll : fonction (élément) {
		return dir( elem, "previousSibling" );
	},
	nextUntil : fonction( elem, _i, jusqu'à ) {
		return dir( elem, "nextSibling", jusqu'à );
	},
	prevUntil : fonction( elem, _i, jusqu'à ) {
		return dir( elem, "previousSibling", jusqu'à );
	},
	frères et sœurs : function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	enfants : fonction (élément) {
		return siblings( elem.firstChild );
	},
	contenu : fonction (élément) {
		si ( elem.contentDocument != null &&

			// Prise en charge : IE 11+
			// Les éléments <object> sans attribut `data` ont un objet
			// `contentDocument` avec un prototype `null`.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument ;
		}

		// Prise en charge : IE 9 - 11 uniquement, iOS 7 uniquement, navigateur Android <= 4.3 uniquement
		// Traite l'élément de modèle comme un élément normal dans les navigateurs qui
		// ne le supporte pas.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.contenu || élément ;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, fonction( nom, fn ) {
	jQuery.fn[ nom ] = fonction( jusqu'à, sélecteur ) {
		var matched = jQuery.map( this, fn, until );

		if ( nom.tranche( -5 ) !== "Jusqu'à" ) {
			sélecteur = jusqu'à ;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		si ( this.length > 1 ) {

			// Supprimer les doublons
			if ( !guaranteedUnique[ nom ] ) {
				jQuery.uniqueSort( correspondant );
			}

			// Ordre inverse pour les parents* et les dérivés précédents
			if ( rparentsprev.test( nom ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	} ;
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convertit les options au format chaîne en options au format objet
function créerOptions( options ) {
	var objet = {} ;
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		objet[ drapeau ] = vrai ;
	} );
	objet de retour ;
}

/*
 * Créez une liste de rappel en utilisant les paramètres suivants :
 *
 * options : une liste facultative d'options séparées par des espaces qui modifient la façon dont
 * la liste de rappel se comporte ou un objet d'option plus traditionnel
 *
 * Par défaut, une liste de rappel agira comme une liste de rappel d'événement et peut être
 * "tiré" plusieurs fois.
 *
 *Options possibles :
 *
 * une fois : garantira que la liste de rappel ne peut être déclenchée qu'une seule fois (comme un différé)
 *
 * mémoire : gardera une trace des valeurs précédentes et appellera tout rappel ajouté
 * après que la liste ait été tirée tout de suite avec le dernier "mémorisé"
 * valeurs (comme un Différé)
 *
 * unique : garantit qu'un rappel ne peut être ajouté qu'une seule fois (pas de doublon dans la liste)
 *
 * stopOnFalse : interrompt les appels lorsqu'un rappel renvoie faux
 *
 */
jQuery.Callbacks = fonction (options) {

	// Convertit les options du format chaîne au format objet si nécessaire
	// (nous vérifions d'abord le cache)
	options = type d'options === "chaîne" ?
		createOptions( options ) :
		jQuery.extend({}, options);

	var // Drapeau pour savoir si la liste est en train de se déclencher
		cuisson,

		// Valeur du dernier tir pour les listes inoubliables
		Mémoire,

		// Drapeau pour savoir si la liste a déjà été déclenchée
		licencié,

		// Drapeau pour empêcher le tir
		fermé à clé,

		// Liste de rappel réelle
		liste = [],

		// File d'attente des données d'exécution pour les listes répétables
		file d'attente = [],

		// Index du rappel en cours de déclenchement (modifié par ajout/suppression si nécessaire)
		index de tir = -1,

		// Rappels de feu
		feu = fonction() {

			// Appliquer le tir unique
			verrouillé = verrouillé || options.une fois ;

			// Exécute les rappels pour toutes les exécutions en attente,
			// en respectant les substitutions d'index de tir et les changements d'exécution
			tiré = tir = vrai ;
			for (; queue.length; index de tir = -1 ) {
				mémoire = queue.shift();
				tandis que ( ++firingIndex < list.length ) {

					// Exécuter le rappel et vérifier la résiliation anticipée
					if ( liste[ index de tir ].apply( mémoire[ 0 ], mémoire[ 1 ] ) === faux &&
						options.stopOnFalse ) {

						// Aller à la fin et oublier les données pour que .add ne se relance pas
						tirIndex = liste.longueur ;
						mémoire = faux ;
					}
				}
			}

			// Oubliez les données si nous en avons fini
			if ( !options.memory ) {
				mémoire = faux ;
			}

			tir = faux ;

			// Nettoyer si nous avons fini de tirer pour de bon
			si ( verrouillé ) {

				// Conserver une liste vide si nous avons des données pour les futurs appels d'ajout
				si ( mémoire ) {
					liste = [] ;

				// Sinon, cet objet est dépensé
				} autre {
					liste = "" ;
				}
			}
		},

		// Objet de rappels réels
		soi = {

			// Ajoute un rappel ou une collection de rappels à la liste
			ajouter : fonction() {
				si ( liste ) {

					// Si nous avons de la mémoire d'une exécution passée, nous devrions nous déclencher après avoir ajouté
					si (mémoire && !tir) {
						tirIndex = liste.longueur - 1 ;
						queue.push( mémoire );
					}

					( fonction ajouter( args ) {
						jQuery.each( args, fonction( _, arg ) {
							si ( estFonction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									liste.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspecter récursivement
								ajouter( arg );
							}
						} );
					} )( arguments );

					si (mémoire && !tir) {
						Feu();
					}
				}
				retournez ceci;
			},

			// Supprime un rappel de la liste
			supprimer : fonction() {
				jQuery.each( arguments, fonction( _, arg ) {
					indice variable ;
					tandis que ( ( index = jQuery.inArray( arg, liste, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Gérer les index de tir
						si ( index <= index de tir ) {
							index de tir-- ;
						}
					}
				} );
				retournez ceci;
			},

			// Vérifie si un rappel donné est dans la liste.
			// Si aucun argument n'est donné, retourne si oui ou non la liste a des rappels attachés.
			a : fonction ( fn ) {
				retour fn ?
					jQuery.inArray( fn, liste ) > -1 :
					liste.longueur > 0 ;
			},

			// Supprime tous les rappels de la liste
			vide : fonction() {
				si ( liste ) {
					liste = [] ;
				}
				retournez ceci;
			},

			// Désactiver .fire et .add
			// Abandonner toutes les exécutions en cours/en attente
			// Effacer tous les rappels et valeurs
			désactiver : fonction() {
				verrouillé = file d'attente = [] ;
				liste = mémoire = "" ;
				retournez ceci;
			},
			désactivé : fonction() {
				retourner !liste;
			},

			// Désactiver .fire
			// Désactive également .add sauf si nous avons de la mémoire (car cela n'aurait aucun effet)
			// Abandonner toutes les exécutions en attente
			verrouiller : fonction() {
				verrouillé = file d'attente = [] ;
				if ( !mémoire && !tir ) {
					liste = mémoire = "" ;
				}
				retournez ceci;
			},
			verrouillé : fonction() {
				retour !! verrouillé;
			},

			// Appelle tous les rappels avec le contexte et les arguments donnés
			feuAvec : fonction (contexte, arguments) {
				si ( ! verrouillé ) {
					args = args || [] ;
					args = [ contexte, args.tranche ? args.tranche() : args ];
					queue.push( args );
					si ( ! tir ) {
						Feu();
					}
				}
				retournez ceci;
			},

			// Appelle tous les rappels avec les arguments donnés
			feu : fonction() {
				self.fireWith( this, arguments );
				retournez ceci;
			},

			// Pour savoir si les callbacks ont déjà été appelés au moins une fois
			déclenché : fonction() {
				retour !! tiré;
			}
		} ;

	revenir soi-même;
} ;


fonction Identité( v ) {
	retourner v ;
}
fonction Lanceur( ex ) {
	jeter ex;
}

function adoptValue( valeur, résoudre, rejeter, noValue ) {
	méthode var ;

	essayer {

		// Vérifier d'abord l'aspect promesse pour privilégier le comportement synchrone
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( valeur ).done( résoudre ).fail( rejeter );

		// Autres variables
		} else if ( valeur && isFunction( ( method = value.then ) ) ) {
			method.call( valeur, résoudre, rejeter );

		// Autres non-thénables
		} autre {

			// Contrôlez les arguments `resolve` en laissant Array#slice convertir booléen `noValue` en entier :
			// * faux : [ valeur ].tranche( 0 ) => résoudre ( valeur )
			// * vrai : [ valeur ].tranche( 1 ) => résoudre()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// Pour Promises/A+, convertir les exceptions en rejets
	// Puisque jQuery.when ne déballe pas thenables, nous pouvons ignorer les vérifications supplémentaires apparaissant dans
	// Deferred#then pour supprimer conditionnellement le rejet.
	} capture ( valeur ) {

		// Prise en charge : Android 4.0 uniquement
		// Les fonctions en mode strict appelées sans .call/.apply obtiennent le contexte d'objet global
		rejeter.appliquer( non défini, [ valeur ] );
	}
}

jQuery.extend( {

	Différé : function( func ) {
		var tuples = [

				// action, ajouter un écouteur, des rappels,
				// ... .then gestionnaires, index d'argument, [état final]
				[ "notifier", "progression", jQuery.Callbacks( "mémoire" ),
					jQuery.Callbacks( "mémoire" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "une fois la mémoire"),
					jQuery.Callbacks( "une fois la mémoire" ), 0, "résolu" ],
				[ "reject", "fail", jQuery.Callbacks( "une fois la mémoire"),
					jQuery.Callbacks( "une fois la mémoire" ), 1, "rejeté" ]
			],
			état = "en attente",
			promesse = {
				fonction d'état() {
					état de retour ;
				},
				toujours : fonction() {
					différé.done( arguments ).fail( arguments );
					retournez ceci;
				},
				"attraper": fonction( fn ) {
					return promise.then( null, fn );
				},

				// Conserver le tuyau pour la rétrocompatibilité
				pipe : function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments ;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, fonction( _i, tuple ) {

							// Mappez les tuples (progress, done, fail) aux arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// différé.progress(fonction() { lier à newDefer ou newDefer.notify })
							// différé.done(fonction() { lier à newDefer ou newDefer.resolve })
							// différé.fail(fonction() { lier à newDefer ou newDefer.reject })
							différé[ tuple[ 1 ] ]( fonction() {
								var renvoyé = fn && fn.apply( this, arguments );
								if ( retourné && isFunction( return.promise ) ) {
									retour.promesse()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} autre {
									newDefer[ tuple[ 0 ] + "Avec" ](
										ce,
										fn ? [ retourné ] : arguments
									);
								}
							} );
						} );
						fns = nul ;
					} ).promettre();
				},
				puis : function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0 ;
					function résoudre (profondeur, différé, gestionnaire, spécial) {
						fonction de retour() {
							var ça = ça,
								args = arguments,
								pourraitJeter = fonction() {
									var est revenu, alors ;

									// Support : Promesses/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignorer les tentatives de double résolution
									si ( profondeur < maxDepth ) {
										retourner;
									}

									retourné = handler.apply( that, args );

									// Support : Promesses/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									si ( retourné === différé.promesse() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support : Promesses/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Récupérer `then` une seule fois
									then = retourné &&

										// Support : Promesses/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Ne vérifie que les objets et les fonctions pour leur aptitude
										( typeof renvoyé === "objet" ||
											typeof renvoyé === "fonction" ) &&
										retourné.alors;

									// Gère un thenable retourné
									si ( estFonction( alors ) ) {

										// Les processeurs spéciaux (notifier) ​​attendent juste la résolution
										si ( spécial ) {
											puis.appel(
												revenu,
												résoudre ( maxDepth, différé, identité, spécial ),
												résoudre( maxDepth, différé, Lanceur, spécial )
											);

										// Les processeurs normaux (résolution) s'accrochent également à la progression
										} autre {

											// ...et ignorer les anciennes valeurs de résolution
											maxDepth++ ;

											puis.appel(
												revenu,
												résoudre ( maxDepth, différé, identité, spécial ),
												résoudre( maxDepth, différé, Lanceur, spécial ),
												résoudre (maxDepth, différé, identité,
													différé.notifyWith )
											);
										}

									// Traite toutes les autres valeurs renvoyées
									} autre {

										// Seuls les gestionnaires de substitution transmettent le contexte
										// et plusieurs valeurs (comportement non spécifié)
										if ( gestionnaire !== Identité ) {
											cela = indéfini ;
											args = [ renvoyé ] ;
										}

										// Traiter la ou les valeurs
										// Le processus par défaut est la résolution
										( spécial || différé. résolutionAvec )( cela, args );
									}
								},

								// Seuls les processeurs normaux (résolution) interceptent et rejettent les exceptions
								processus = spécial ?
									couldThrow :
									une fonction() {
										essayer {
											pourraitJeter();
										} attraper ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support : Promesses/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignorer les exceptions post-résolution
											si ( profondeur + 1 >= maxDepth ) {

												// Seuls les gestionnaires de substitution transmettent le contexte
												// et plusieurs valeurs (comportement non spécifié)
												if ( gestionnaire !== Lanceur ) {
													cela = indéfini ;
													args = [ e ] ;
												}

												différé.rejectWith( cela, args );
											}
										}
									} ;

							// Support : Promesses/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-résolvez les promesses immédiatement pour éviter les faux rejets de
							// erreurs suivantes
							si ( profondeur ) {
								traiter();
							} autre {

								// Appel d'un hook optionnel pour enregistrer la pile, en cas d'exception
								// puisqu'il est autrement perdu lorsque l'exécution devient asynchrone
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( processus );
							}
						} ;
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							résoudre(
								0,
								nouveau Différer,
								isFunction( onProgress ) ?
									en cours :
									Identité,
								newDefer.notifyWith
							)
						);

						// remplis_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							résoudre(
								0,
								nouveau Différer,
								isFunction( onFulfilled ) ?
									surRéalisé :
									Identité
							)
						);

						// gestionnaires_rejetés.add( ... )
						tuples[ 2 ][ 3 ].add(
							résoudre(
								0,
								nouveau Différer,
								isFunction( onRejected ) ?
									onRejected :
									Lanceur
							)
						);
					} ).promettre();
				},

				// Obtenir une promesse pour ce différé
				// Si obj est fourni, l'aspect promesse est ajouté à l'objet
				promesse : fonction (obj) {
					retourner obj != null ? jQuery.extend( obj, promesse ) : promesse;
				}
			},
			différé = {} ;

		// Ajouter des méthodes spécifiques à la liste
		jQuery.each( tuples, fonction( je, tuple ) {
			var liste = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promesse.progress = liste.add
			// promesse.done = liste.add
			// promesse.fail = liste.add
			promesse[ tuple[ 1 ] ] = liste.add;

			// Etat de la poignée
			si ( chaîne d'état ) {
				liste.add(
					une fonction() {

						// état = "résolu" (c'est-à-dire rempli)
						// état = "rejeté"
						état = chaîne d'état ;
					},

					// rejet_rappels.disable
					// rempli_rappels.disable
					tuples[ 3 - i ][ 2 ].disable,

					// handlers_rejetés.disable
					// rempli_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// rempli_handlers.fire
			// handlers_rejetés.fire
			list.add( tuple[ 3 ].fire );

			// différé.notifier = fonction() { différé.notifierAvec(...) }
			// différé.résolution = fonction() { différé.résolutionAvec(...) }
			// différé.rejet = fonction() { différé.rejetAvec(...) }
			différé[ tuple[ 0 ] ] = fonction() {
				différé[ tuple[ 0 ] + "Avec" ]( this === différé ? undefined : this, arguments );
				retournez ceci;
			} ;

			// différé.notifyWith = list.fireWith
			// différé.résolutionAvec = liste.feuAvec
			// différé.rejectWith = list.fireWith
			différé[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Faire du différé une promesse
		promesse.promesse( différée );

		// Appelez la fonction donnée s'il y en a
		si (fonction) {
			func.call(différé, différé);
		}

		// Terminé!
		retour différé;
	},

	// Helper différé
	quand : fonction (valeur unique) {
		var

			// compte des subordonnés inachevés
			restant = arguments.longueur,

			// nombre d'arguments non traités
			je = restant,

			// données d'exécution subordonnées
			resolveContexts = Array( i ),
			resolveValues ​​= slice.call( arguments ),

			// le Différé principal
			primaire = jQuery. Différé(),

			// usine de rappel subordonnée
			updateFunc = fonction( je ) {
				fonction de retour (valeur) {
					résoudreContexts[ je ] = ceci ;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : valeur;
					si ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues ​​);
					}
				} ;
			} ;

		// Les arguments simples et vides sont adoptés comme Promise.resolve
		si ( restant <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!restant );

			// Utilisez .then() pour déballer les thenables secondaires (cf. gh-3000)
			if ( primary.state() === "en attente" ||
				estFonction (résolventValeurs[ je ] && résolventValeurs[ je ].alors ) ) {

				return primary.then();
			}
		}

		// Plusieurs arguments sont agrégés comme les éléments du tableau Promise.all
		alors que je-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// Ceux-ci indiquent généralement une erreur du programmeur lors du développement,
// en avertir dès que possible plutôt que de les avaler par défaut.
var rerrorNames = /^(Eval|Interne|Plage|Référence|Syntaxe|Type|URI)Erreur$/ ;

jQuery.Deferred.exceptionHook = fonction (erreur, pile) {

	// Prise en charge : IE 8 - 9 uniquement
	// La console existe lorsque les outils de développement sont ouverts, ce qui peut arriver à tout moment
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
} ;




jQuery.readyException = fonction (erreur) {
	window.setTimeout( fonction() {
		lancer une erreur ;
	} );
} ;




// Le différé utilisé sur DOM prêt
var readyList = jQuery.Deferred();

jQuery.fn.ready = fonction( fn ) {

	readyList
		.alors( fn )

		// Enveloppez jQuery.readyException dans une fonction pour que la recherche
		// se produit au moment de la gestion des erreurs au lieu du rappel
		// enregistrement.
		.catch( fonction( erreur ) {
			jQuery.readyException( erreur );
		} );

	retournez ceci;
} ;

jQuery.extend( {

	// Le DOM est-il prêt à être utilisé ? Définir sur vrai une fois qu'il se produit.
	estPrêt : faux,

	// Un compteur pour suivre le nombre d'éléments à attendre avant
	// l'événement prêt se déclenche. Voir #6781
	prêtAttendre : 1,

	// Gérer lorsque le DOM est prêt
	prêt : fonction (attendre) {

		// Abandonner s'il y a des suspensions en attente ou si nous sommes déjà prêts
		si ( attendre === vrai ? --jQuery.readyWait : jQuery.isReady ) {
			retourner;
		}

		// Rappelez-vous que le DOM est prêt
		jQuery.isReady = vrai;

		// Si un événement DOM Ready normal s'est déclenché, décrémente et attend si nécessaire
		si ( attendez !== vrai && --jQuery.readyWait > 0 ) {
			retourner;
		}

		// S'il y a des fonctions liées, à exécuter
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// Le gestionnaire d'événements prêt et la méthode d'auto-nettoyage
fonction terminée() {
	document.removeEventListener( "DOMContentLoaded", terminé );
	window.removeEventListener( "charger", terminé );
	jQuery.ready();
}

// Attrape les cas où $(document).ready() est appelé
// après que l'événement du navigateur s'est déjà produit.
// Prise en charge : IE <=9 - 10 uniquement
// IE plus ancien signale parfois "interactif" trop tôt
if ( document.readyState === "complet" ||
	( document.readyState !== "chargement" && !document.documentElement.doScroll ) ) {

	// Gérez-le de manière asynchrone pour permettre aux scripts de retarder la disponibilité
	window.setTimeout( jQuery.ready );

} autre {

	// Utilisez le rappel d'événement pratique
	document.addEventListener( "DOMContentLoaded", terminé );

	// Un repli vers window.onload, qui fonctionnera toujours
	window.addEventListener( "charger", terminé );
}




// Méthode multifonctionnelle pour obtenir et définir les valeurs d'une collection
// La ou les valeurs peuvent éventuellement être exécutées s'il s'agit d'une fonction
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var je = 0,
		len = elems.longueur,
		vrac = clé == null ;

	// Définit plusieurs valeurs
	if ( toType( key ) === "object" ) {
		enchaînable = vrai ;
		pour ( je dans la clé ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Définit une valeur
	} sinon si ( valeur !== non défini ) {
		enchaînable = vrai ;

		si ( !estFonction( valeur ) ) {
			brut = vrai ;
		}

		si ( en masse ) {

			// Les opérations en bloc sont exécutées sur l'ensemble complet
			si ( brut ) {
				fn.call( éléments, valeur );
				fn = nul ;

			// ...sauf lors de l'exécution des valeurs de fonction
			} autre {
				volume = fn ;
				fn = fonction (élément, _clé, valeur) {
					return bulk.call( jQuery( elem ), value );
				} ;
			}
		}

		si ( fn ) {
			pour (; je < longueur; je++ ) {
				fn(
					elems[ i ], clé, raw ?
						évaluer :
						value.call( elems[ je ], je, fn( elems[ je ], clé ) )
				);
			}
		}
	}

	si (chaîné) {
		éléments de retour ;
	}

	// Récupère
	si ( en masse ) {
		return fn.call( elems );
	}

	retour len ? fn( elems[ 0 ], key ) : emptyGet;
} ;


// Correspond à la chaîne en pointillés pour la camelisation
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([az])/g ;

// Utilisé par camelCase comme rappel pour replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convertit les tirets en camelCase ; utilisé par les modules css et data
// Prise en charge : IE <=9 - 11, Edge 12 - 15
// Microsoft a oublié d'augmenter le préfixe de son fournisseur (#9572)
fonction camelCase( chaîne ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = fonction (propriétaire) {

	// Accepte uniquement :
	// - Nœud
	// - Noeud.ELEMENT_NODE
	// - Noeud.DOCUMENT_NODE
	// - Objet
	// - Quelconque
	renvoie propriétaire.nodeType === 1 || propriétaire.nodeType === 9 || !( +owner.nodeType );
} ;




fonction Données() {
	this.expando = jQuery.expando + Data.uid++ ;
}

Données.uid = 1 ;

Données.prototype = {

	cache : fonction (propriétaire) {

		// Vérifie si l'objet propriétaire a déjà un cache
		var valeur = propriétaire[ this.expando ] ;

		// Sinon, créez-en un
		si ( !valeur ) {
			valeur = {} ;

			// Nous pouvons accepter des données pour les nœuds non élémentaires dans les navigateurs modernes,
			// mais nous ne devrions pas, voir #8335.
			// Retourne toujours un objet vide.
			si ( acceptData( propriétaire ) ) {

				// S'il s'agit d'un nœud peu susceptible d'être stringifié ou bouclé
				// utilise l'affectation simple
				si ( propriétaire.nodeType ) {
					propriétaire[ this.expando ] = valeur ;

				// Sinon, sécurisez-le dans une propriété non énumérable
				// configurable doit être vrai pour permettre à la propriété d'être
				// supprimé lorsque les données sont supprimées
				} autre {
					Object.defineProperty( propriétaire, this.expando, {
						valeur : valeur,
						paramétrable : vrai
					} );
				}
			}
		}

		valeur de retour ;
	},
	set : fonction (propriétaire, données, valeur) {
		accessoire var,
			cache = this.cache( propriétaire );

		// Descripteur : [ propriétaire, clé, valeur ] args
		// Toujours utiliser la clé camelCase (gh-2257)
		si ( type de données === "chaîne" ) {
			cache[ camelCase( data ) ] = valeur ;

		// Descripteur : [ propriétaire, { propriétés } ] args
		} autre {

			// Copie les propriétés une par une dans l'objet cache
			pour (prop dans les données) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		cache de retour ;
	},
	obtenir : fonction (propriétaire, clé) {
		touche de retour === indéfini ?
			this.cache( propriétaire ) :

			// Toujours utiliser la clé camelCase (gh-2257)
			propriétaire[ this.expando ] && propriétaire[ this.expando ][ camelCase( key ) ] ;
	},
	access: function( propriétaire, clé, valeur ) {

		// Dans les cas où soit :
		//
		// 1. Aucune clé n'a été spécifiée
		// 2. Une clé de chaîne a été spécifiée, mais aucune valeur n'a été fournie
		//
		// Prend le chemin "read" et permet à la méthode get de déterminer
		// quelle valeur retourner, respectivement soit :
		//
		// 1. L'intégralité de l'objet cache
		// 2. Les données stockées à la clé
		//
		si ( clé === indéfini ||
				( ( clé && type de clé === "chaîne" ) && valeur === indéfini ) ) {

			return this.get( propriétaire, clé );
		}

		// Lorsque la clé n'est pas une chaîne, ou à la fois une clé et une valeur
		// sont spécifiés, définis ou étendus (objets existants) avec soit :
		//
		// 1. Un objet de propriétés
		// 2. Une clé et une valeur
		//
		this.set( propriétaire, clé, valeur );

		// Puisque le chemin "set" peut avoir deux points d'entrée possibles
		// renvoie les données attendues en fonction du chemin emprunté[*]
		valeur de retour !== non défini ? valeur : clé ;
	},
	supprimer : fonction (propriétaire, clé) {
		var je,
			cache = propriétaire[ this.expando ] ;

		si (cache === non défini) {
			retourner;
		}

		si ( clé !== non défini ) {

			// Prise en charge d'un tableau ou d'une chaîne de clés séparées par des espaces
			if ( Array.isArray( clé ) ) {

				// Si clé est un tableau de clés...
				// Nous définissons toujours les clés camelCase, donc supprimez-les.
				key = key.map( camelCase );
			} autre {
				clé = camelCase( clé );

				// Si une clé avec des espaces existe, utilisez-la.
				// Sinon, créez un tableau en faisant correspondre des espaces non blancs
				clé = clé dans le cache ?
					[ clé ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = clé.longueur ;

			alors que je-- ) {
				supprimer le cache[ clé[ i ] ] ;
			}
		}

		// Supprime l'expando s'il n'y a plus de données
		if ( clé === indéfini || jQuery.isEmptyObject( cache ) ) {

			// Prise en charge : Chrome <=35 - 45
			// Les performances de Webkit & Blink souffrent lors de la suppression de propriétés
			// à partir des nœuds DOM, donc mis à undefined à la place
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bogue limité)
			si ( propriétaire.nodeType ) {
				propriétaire[ this.expando ] = non défini ;
			} autre {
				supprimer le propriétaire[ this.expando ] ;
			}
		}
	},
	hasData : fonction (propriétaire) {
		var cache = propriétaire[ this.expando ] ;
		renvoie le cache !== non défini && !jQuery.isEmptyObject( cache );
	}
} ;
var dataPriv = new Data();

var dataUser = new Data();



// Résumé de la mise en œuvre
//
// 1. Appliquer la surface API et la compatibilité sémantique avec la branche 1.9.x
// 2. Améliorer la maintenabilité du module en réduisant le stockage
// chemins vers un seul mécanisme.
// 3. Utilisez le même mécanisme unique pour prendre en charge les données "privées" et "utilisateurs".
// 4. _Never_ exposez des données "privées" au code utilisateur (TODO : Drop _data, _removeData)
// 5. Évitez d'exposer les détails d'implémentation sur les objets utilisateur (par exemple, les propriétés expando)
// 6. Fournir un chemin clair pour la mise à niveau de la mise en œuvre vers WeakMap en 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[AZ]/g ;

fonction getData( données ) {
	si (données === "vrai" ) {
		retourner vrai ;
	}

	si ( données === "faux" ) {
		retourner faux ;
	}

	si ( données === "null" ) {
		renvoie nul ;
	}

	// Ne convertit en nombre que s'il ne change pas la chaîne
	si (données === +données + "" ) {
		retour +données ;
	}

	si (rbrace.test(données)) {
		return JSON.parse( data );
	}

	renvoyer des données ;
}

function dataAttr( elem, key, data ) {
	nom de la variable ;

	// Si rien n'a été trouvé en interne, essayez d'en récupérer
	// données de l'attribut HTML5 data-*
	if ( data === indéfini && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( nom );

		si ( type de données === "chaîne" ) {
			essayer {
				données = getData( données );
			} attraper ( e ) {}

			// Assurez-vous que nous avons défini les données afin qu'elles ne soient pas modifiées ultérieurement
			dataUser.set( élément, clé, données );
		} autre {
			données = indéfini ;
		}
	}
	renvoyer des données ;
}

jQuery.extend( {
	aDonnées : fonction (élément) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	données : fonction (élément, nom, données) {
		return dataUser.access( elem, name, data );
	},

	removeData : fonction (élément, nom) {
		dataUser.remove( elem, nom );
	},

	// TODO : Maintenant que tous les appels à _data et _removeData ont été remplacés
	// avec des appels directs aux méthodes dataPriv, celles-ci peuvent être obsolètes.
	_data : fonction (élément, nom, données) {
		return dataPriv.access( elem, nom, données );
	},

	_removeData : fonction (élément, nom) {
		dataPriv.remove( elem, nom );
	}
} );

jQuery.fn.extend( {
	données : fonction (clé, valeur) {
		var i, nom, données,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Obtient toutes les valeurs
		si ( clé === indéfini ) {
			si ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.longueur ;
					alors que je-- ) {

						// Prise en charge : IE 11 uniquement
						// Les éléments attrs peuvent être nuls (#14894)
						si ( attrs[ je ] ) {
							nom = attrs[ je ].nom ;
							si ( nom.indexOf( "données-" ) === 0 ) {
								nom = camelCase( nom.tranche( 5 ) );
								dataAttr( elem, nom, data[ nom ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			renvoyer des données ;
		}

		// Définit plusieurs valeurs
		si ( type de clé === "objet" ) {
			return this.each( fonction() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			données var ;

			// L'objet jQuery appelant (l'élément correspond) n'est pas vide
			// (et a donc un élément apparaît à this[ 0 ]) et le
			// Le paramètre `value` n'était pas indéfini. Un objet jQuery vide
			// se traduira par `undefined` pour elem = this[ 0 ] qui sera
			// lève une exception si une tentative de lecture d'un cache de données est effectuée.
			if ( elem && valeur === indéfini ) {

				// Tentative d'obtention des données du cache
				// La clé sera toujours camelCased dans Data
				data = dataUser.get( elem, key );
				si ( données !== non défini ) {
					renvoyer des données ;
				}

				// Tentative de "découvrir" les données dans
				// Attrs de données personnalisées HTML5-*
				data = dataAttr( elem, key );
				si ( données !== non défini ) {
					renvoyer des données ;
				}

				// Nous avons vraiment essayé, mais les données n'existent pas.
				retourner;
			}

			// Définit les données...
			this.each( fonction() {

				// Nous stockons toujours la clé camelCased
				dataUser.set( this, key, value );
			} );
		}, null, valeur, arguments.length > 1, null, true );
	},

	removeData : fonction (clé) {
		return this.each( fonction() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	file d'attente : fonction (élément, type, données) {
		file d'attente var ;

		si (élément) {
			type = ( type || "fx" ) + "file d'attente" ;
			queue = dataPriv.get( elem, type );

			// Accélérez la sortie de file d'attente en sortant rapidement s'il ne s'agit que d'une recherche
			si ( données ) {
				if ( !file d'attente || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} autre {
					queue.push( data );
				}
			}
			file d'attente de retour || [] ;
		}
	},

	retirer de la file d'attente : fonction (élément, type) {
		type = type || "fx" ;

		var queue = jQuery.queue( elem, type ),
			startLength = queue.longueur,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( élément, type ),
			suivant = fonction() {
				jQuery.dequeue( elem, type );
			} ;

		// Si la file d'attente f x est retirée de la file d'attente, supprimez toujours la sentinelle de progression
		si ( fn === "en cours" ) {
			fn = queue.shift();
			startLength-- ;
		}

		si ( fn ) {

			// Ajout d'une sentinelle de progression pour empêcher la file d'attente fx d'être
			// automatiquement retiré de la file d'attente
			si ( tapez === "fx" ) {
				queue.unshift( "en cours" );
			}

			// Efface la dernière fonction d'arrêt de file d'attente
			supprimer hooks.stop ;
			fn.call( elem, next, crochets );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Non public - génère un objet queueHooks ou renvoie l'objet courant
	_queueHooks : fonction (élément, type) {
		clé var = type + "queueHooks" ;
		return dataPriv.get( elem, key ) || dataPriv.access( élément, clé, {
			vide : jQuery.Callbacks( "une fois la mémoire") .add( function() {
				dataPriv.remove( elem, [ type + "file d'attente", clé ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	file d'attente : fonction (type, données) {
		var setter = 2;

		si ( typede type !== "chaîne" ) {
			données = type ;
			type = "fx" ;
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		données de retour === non défini ?
			ce :
			this.each( fonction() {
				var queue = jQuery.queue( this, type, data );

				// Assure un crochet pour cette file d'attente
				jQuery._queueHooks( this, type );

				si ( type === "fx" && queue[ 0 ] !== "en cours" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	retirer de la file d'attente : fonction (type) {
		return this.each( fonction() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue : fonction (type) {
		return this.queue( type || "fx", [] );
	},

	// Obtient une promesse résolue lorsque les files d'attente d'un certain type
	// sont vidés (fx est le type par défaut)
	promesse : fonction (type, obj) {
		var tmp,
			compter = 1,
			différer = jQuery. Différé(),
			éléments = ceci,
			i = cette.longueur,
			résoudre = fonction() {
				si ( !( --count ) ) {
					defer.resolveWith( éléments, [ éléments ] );
				}
			} ;

		si ( typede type !== "chaîne" ) {
			obj = type ;
			type = indéfini ;
		}
		type = type || "fx" ;

		alors que je-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			si ( tmp && tmp.empty ) {
				compter++ ;
				tmp.empty.add( résoudre );
			}
		}
		résoudre();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([az%]*)$", "i" );


var cssExpand = [ "Haut", "Droite", "Bas", "Gauche" ] ;

var documentElement = document.documentElement;



	var est attaché = fonction (élément) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composé = { composé : vrai } ;

	// Prise en charge : IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 uniquement
	// Vérifier l'attachement à travers les limites du DOM fantôme lorsque cela est possible (gh-3504)
	// Prise en charge : iOS 10.0-10.2 uniquement
	// Les premières versions d'iOS 10 prennent en charge `attachShadow` mais pas `getRootNode`,
	// conduit à des erreurs. Nous devons vérifier `getRootNode`.
	si ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode ( composé ) === elem.ownerDocument ;
		} ;
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree peut être appelé depuis la fonction jQuery#filter ;
		// dans ce cas, l'élément sera le deuxième argument
		elem = el || élément ;

		// Le style en ligne l'emporte sur tout
		return elem.style.display === "aucun" ||
			elem.style.display === "" &&

			// Sinon, vérifier le style calculé
			// Prise en charge : Firefox <=43 - 45
			// Les éléments déconnectés peuvent avoir un affichage calculé : aucun, donc confirmez d'abord que l'élément est
			// dans le document.
			est Attaché (élément) &&

			jQuery.css( elem, "display" ) === "aucun" ;
	} ;



fonction ajusterCSS( elem, prop, valueParts, tween ) {
	var ajusté, échelle,
		maxItérations = 20,
		valeuractuelle = tween ?
			une fonction() {
				return tween.cur();
			} :
			une fonction() {
				return jQuery.css( elem, prop, "" );
			},
		initiale = valeurcourante(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Le calcul de la valeur de départ est requis pour les incompatibilités potentielles d'unités
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unité !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unité ) {

		// Prise en charge : Firefox <=54
		// Réduisez de moitié la valeur cible de l'itération pour éviter les interférences des limites supérieures CSS (gh-2144)
		initiale = initiale / 2 ;

		// Unités de confiance rapportées par jQuery.css
		unité = unité || initialInUnit[ 3 ] ;

		// Approche itérative à partir d'un point de départ différent de zéro
		initialeDansUnité = +initiale || 1;

		tandis que ( maxIterations-- ) {

			// Évaluer et mettre à jour notre meilleure estimation (doubler les hypothèses qui se mettent à zéro).
			// Terminer si l'échelle est égale ou dépasse 1 (ce qui rend l'ancien*nouveau produit non positif).
			jQuery.style( elem, prop, initialInUnit + unit );
			si ( ( 1 - échelle ) * ( 1 - ( échelle = valeuractuelle() / initiale || 0,5 ) ) <= 0 ) {
				maxItérations = 0 ;
			}
			initialInUnit = initialInUnit / échelle ;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Assurez-vous que nous mettrons à jour les propriétés de l'interpolation plus tard
		valueParts = valueParts || [] ;
	}

	si (valeurParts) {
		initialInUnit = +initialInUnit || +initiale || 0 ;

		// Applique le décalage relatif (+=/-=) si spécifié
		ajusté = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ] ;
		si (interpolation) {
			tween.unit = unité ;
			tween.start = initialInUnit;
			tween.end = ajusté ;
		}
	}
	rendement ajusté ;
}


var defaultDisplayMap = {} ;

function getDefaultDisplay( elem ) {
	température variable,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ] ;

	si (afficher) {
		retour affichage ;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "aucun" ) {
		display = "bloc" ;
	}
	defaultDisplayMap[ nodeName ] = afficher ;

	retour affichage ;
}

function showHide( elements, show ) {
	affichage var, élément,
		valeurs = [],
		indice = 0,
		longueur = éléments.longueur ;

	// Détermine la nouvelle valeur d'affichage pour les éléments qui doivent changer
	for ( ; index < longueur; index++ ) {
		elem = éléments[ index ] ;
		if ( !elem.style ) {
			Continuez;
		}

		display = elem.style.display;
		si (montrer) {

			// Puisque nous forçons la visibilité sur les éléments cachés en cascade, un effet immédiat (et lent)
			// une vérification est requise dans cette première boucle sauf si nous avons une valeur d'affichage non vide (soit
			// en ligne ou sur le point d'être restauré)
			if ( display === "aucun" ) {
				valeurs[ index ] = dataPriv.get( elem, "display" ) || nul;
				si ( !valeurs[ index ] ) {
					elem.style.display = "" ;
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				valeurs[ index ] = getDefaultDisplay( elem );
			}
		} autre {
			si ( affiche !== "aucun" ) {
				valeurs[ index ] = "aucun" ;

				// Se souvenir de ce que nous écrasons
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Définit l'affichage des éléments dans une deuxième boucle pour éviter un reflow constant
	for ( index = 0; index < longueur; index++ ) {
		si ( valeurs[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	éléments de retour ;
}

jQuery.fn.extend( {
	afficher : fonction() {
		return showHide( this, true );
	},
	cacher : fonction() {
		return showHide( this );
	},
	bascule : fonction (état) {
		si ( type d'état === "booléen" ) {
			état de retour ? this.show() : this.hide();
		}

		return this.each( fonction() {
			si ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} autre {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([az][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( une fonction() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		entrée = document.createElement( "entrée" );

	// Prise en charge : Android 4.0 - 4.3 uniquement
	// Vérifier l'état perdu si le nom est défini (#11217)
	// Prise en charge : applications Web Windows (WWA)
	// `name` et `type` doivent utiliser .setAttribute pour WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "vérifié", "vérifié" );
	input.setAttribute( "nom", "t" );

	div.appendChild( input );

	// Prise en charge : Android <=4.1 uniquement
	// L'ancien WebKit ne clone pas correctement l'état coché dans les fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Prise en charge : IE <=11 uniquement
	// Assurez-vous que la zone de texte (et la case à cocher) defaultValue est correctement clonée
	div.innerHTML = "<textarea>x</textarea>" ;
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Prise en charge : IE <=9 uniquement
	// IE <=9 remplace les balises <option> par leur contenu lorsqu'elles sont insérées en dehors de
	// l'élément sélectionné.
	div.innerHTML = "<option></option>" ;
	support.option = !!div.lastChild;
} )();


// Nous devons fermer ces balises pour supporter XHTML (#13200)
var wrapMap = {

	// Les parseurs XHTML n'insèrent pas comme par magie des éléments dans le
	// de la même manière que les analyseurs de soupe de balises. Nous ne pouvons donc pas raccourcir
	// cela en omettant <tbody> ou d'autres éléments requis.
	tête : [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr : [ 2, "<table><tbody>", "</tbody></table>"],
	td : [ 3, "<table><tbody><tr>", "</tr></tbody></table>"],

	_défaut : [ 0, "", "" ]
} ;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead ;
wrapMap.th = wrapMap.td ;

// Prise en charge : IE <=9 uniquement
si ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ] ;
}


function getAll( contexte, tag ) {

	// Prise en charge : IE <=9 - 11 uniquement
	// Utilisez typeof pour éviter l'invocation de méthode sans argument sur les objets hôtes (#15151)
	varret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( balise || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( balise || "*" );

	} autre {
		ret = [] ;
	}

	if ( tag === indéfini || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ contexte ], ret );
	}

	retour ret;
}


// Marquer les scripts comme ayant déjà été évalués
function setGlobalEval( elems, refElements ) {
	var je = 0,
		l = elems.longueur ;

	pour (; je < l; je++ ) {
		dataPriv.set(
			éléments[ je ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( éléments, contexte, scripts, sélection, ignoré ) {
	var elem, tmp, étiquette, envelopper, attaché, j,
		fragment = context.createDocumentFragment(),
		nœuds = [],
		je = 0,
		l = elems.longueur ;

	pour (; je < l; je++ ) {
		elem = elems[ je ] ;

		si ( élém || élém === 0 ) {

			// Ajouter des nœuds directement
			if ( toType( elem ) === "object" ) {

				// Prise en charge : Android <= 4.0 uniquement, PhantomJS 1 uniquement
				// push.apply(_, arraylike) lance sur l'ancien WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convertit non-html en un nœud de texte
			} sinon si ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convertit le HTML en nœuds DOM
			} autre {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Désérialise une représentation standard
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapCarte[ balise ] || wrapMap._default ;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descendez à travers les wrappers jusqu'au bon contenu
				j = envelopper[ 0 ] ;
				tandis que ( j-- ) {
					tmp = tmp.dernierenfant ;
				}

				// Prise en charge : Android <= 4.0 uniquement, PhantomJS 1 uniquement
				// push.apply(_, arraylike) lance sur l'ancien WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Mémoriser le conteneur de niveau supérieur
				tmp = fragment.firstChild ;

				// Assurez-vous que les nœuds créés sont orphelins (#12392)
				tmp.textContent = "" ;
			}
		}
	}

	// Supprime le wrapper du fragment
	fragment.textContent = "" ;

	je = 0 ;
	tandis que ( ( elem = nodes[ i++ ] ) ) {

		// Ignore les éléments déjà dans la collection de contexte (trac-4087)
		if ( sélection && jQuery.inArray( elem, selection ) > -1 ) {
			si ( ignoré ) {
				ignoré.push( elem );
			}
			Continuez;
		}

		Attaché = isAttached( elem );

		// Ajoute au fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Conserver l'historique d'évaluation des scripts
		si Joint ) {
			setGlobalEval( tmp );
		}

		// Capture des exécutables
		si (scripts) {
			j = 0 ;
			tandis que ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	fragment de retour ;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/ ;

fonction retourVrai() {
	retourner vrai ;
}

fonction returnFalse() {
	retourner faux ;
}

// Prise en charge : IE <=9 - 11+
// focus() et blur() sont asynchrones, sauf lorsqu'ils sont no-op.
// Attendez-vous donc à ce que le focus soit synchrone lorsque l'élément est déjà actif,
// et flou pour être synchrone lorsque l'élément n'est pas déjà actif.
// (la mise au point et le flou sont toujours synchrones dans les autres navigateurs pris en charge,
// cela définit juste quand nous pouvons compter dessus).
function attendSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Prise en charge : IE <=9 uniquement
// L'accès à document.activeElement peut lancer de manière inattendue
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	essayer {
		retourner document.activeElement ;
	} attrape ( erreur ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origineFn, type ;

	// Les types peuvent être une carte de types/gestionnaires
	si ( typeof types === "objet" ) {

		// ( types-Objet, sélecteur, données )
		if ( typeof selector !== "string" ) {

			// ( types-Objet, données )
			données = données || sélecteur;
			sélecteur = indéfini ;
		}
		pour (taper les types) {
			on( elem, type, selector, data, types[ type ], one );
		}
		élément de retour ;
	}

	si (données == null && fn == null ) {

		// ( types, fn )
		fn = sélecteur ;
		données = sélecteur = indéfini ;
	} sinon si ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, sélecteur, fn )
			fn = données ;
			données = indéfini ;
		} autre {

			// ( types, données, fn )
			fn = données ;
			données = sélecteur ;
			sélecteur = indéfini ;
		}
	}
	si ( fn === faux ) {
		fn = retourFaux ;
	} sinon si ( !fn ) {
		élément de retour ;
	}

	si ( un === 1 ) {
		origineFn = fn ;
		fn = fonction (événement) {

			// Peut utiliser un ensemble vide, car l'événement contient les informations
			jQuery().off( événement );
			return origFn.apply( this, arguments );
		} ;

		// Utiliser le même guid pour que l'appelant puisse supprimer en utilisant origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( fonction() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Fonctions d'assistance pour la gestion des événements - ne faisant pas partie de l'interface publique.
 * Accessoires de la bibliothèque addEvent de Dean Edwards pour de nombreuses idées.
 */
jQuery.événement = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			événements, t, handleObj,
			spécial, gestionnaires, type, espaces de noms, origType,
			elemData = dataPriv.get( elem );

		// N'attache des événements qu'aux objets qui acceptent des données
		if ( !acceptData( elem ) ) {
			retourner;
		}

		// L'appelant peut transmettre un objet de données personnalisées à la place du gestionnaire
		si ( gestionnaire. gestionnaire ) {
			handleObjIn = gestionnaire ;
			gestionnaire = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Assurez-vous que les sélecteurs non valides lèvent des exceptions au moment de l'attachement
		// Évaluer par rapport à documentElement dans le cas où elem est un nœud non-élément (par exemple, document)
		si (sélecteur) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Assurez-vous que le gestionnaire a un identifiant unique, utilisé pour le retrouver/supprimer plus tard
		si ( !handler.guid ) {
			gestionnaire.guid = jQuery.guid++;
		}

		// Initialise la structure d'événement et le gestionnaire principal de l'élément, s'il s'agit du premier
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = fonction( e ) {

				// Ignorer le deuxième événement d'un jQuery.event.trigger() et
				// lorsqu'un événement est appelé après le déchargement d'une page
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : indéfini;
			} ;
		}

		// Gérer plusieurs événements séparés par un espace
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ] ;
		t = types.longueur ;
		tandis que ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [] ;
			type = origType = tmp[ 1 ] ;
			espaces de noms = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Il * doit * y avoir un type, aucun gestionnaire d'espace de noms attaché uniquement
			si ( !type ) {
				Continuez;
			}

			// Si l'événement change de type, utilisez les gestionnaires d'événements spéciaux pour le type modifié
			special = jQuery.event.special[ type ] || {} ;

			// Si le sélecteur est défini, détermine le type d'api d'événement spécial, sinon le type est donné
			type = ( selector ? special.delegateType : special.bindType ) || taper;

			// Mise à jour spéciale basée sur le type nouvellement réinitialisé
			special = jQuery.event.special[ type ] || {} ;

			// handleObj est passé à tous les gestionnaires d'événements
			handleObj = jQuery.extend( {
				type : type,
				type d'origine : type d'origine,
				données : données,
				gestionnaire : gestionnaire,
				guid : gestionnaire.guid,
				sélecteur : sélecteur,
				needContext : sélecteur && jQuery.expr.match.needsContext.test( sélecteur ),
				espace de noms : espaces de noms.join( "." )
			}, handleObjIn );

			// Initialise la file d'attente du gestionnaire d'événements si nous sommes le premier
			si ( !( gestionnaires = événements[ type ] ) ) {
				gestionnaires = événements[ type ] = [] ;
				handlers.delegateCount = 0 ;

				// N'utilisez addEventListener que si le gestionnaire d'événements spéciaux renvoie false
				si ( !spécial.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			si (spécial.add) {
				special.add.call( elem, handleObj );

				si ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid ;
				}
			}

			// Ajouter à la liste des gestionnaires de l'élément, délégués devant
			si (sélecteur) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} autre {
				handlers.push( handleObj );
			}

			// Gardez une trace des événements qui ont déjà été utilisés, pour l'optimisation des événements
			jQuery.event.global[ type ] = vrai;
		}

	},

	// Détacher un événement ou un ensemble d'événements d'un élément
	supprimer : function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			événements, t, handleObj,
			spécial, gestionnaires, type, espaces de noms, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			retourner;
		}

		// Une fois pour chaque type.namespace dans types ; le type peut être omis
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ] ;
		t = types.longueur ;
		tandis que ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [] ;
			type = origType = tmp[ 1 ] ;
			espaces de noms = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Dissocie tous les événements (sur cet espace de noms, s'il est fourni) pour l'élément
			si ( !type ) {
				for (tapez des événements) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				Continuez;
			}

			special = jQuery.event.special[ type ] || {} ;
			type = ( selector ? special.delegateType : special.bindType ) || taper;
			gestionnaires = événements[ type ] || [] ;
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Supprimer les événements correspondants
			origCount = j = handlers.length ;
			tandis que ( j-- ) {
				handleObj = gestionnaires[ j ] ;

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || sélecteur === handleObj.selector ||
						sélecteur === "**" && handleObj.selector ) ) {
					gestionnaires.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount-- ;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Supprime le gestionnaire d'événement générique si nous avons supprimé quelque chose et qu'il n'existe plus de gestionnaire
			// (évite le potentiel de récursivité sans fin lors de la suppression des gestionnaires d'événements spéciaux)
			if ( origCount && !handlers.length ) {
				si ( !special.demontage ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				supprimer les événements[ type ] ;
			}
		}

		// Supprime les données et l'expando s'il n'est plus utilisé
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "gérer les événements" );
		}
	},

	dispatch : fonction( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Créer un jQuery.Event accessible en écriture à partir de l'objet événement natif
			event = jQuery.event.fix( nativeEvent ),

			gestionnaires = (
				dataPriv.get( this, "events" ) || Objet.create( null )
			)[ type.événement ] || [],
			special = jQuery.event.special[ event.type ] || {} ;

		// Utilisez le jQuery.Event corrigé plutôt que l'événement natif (en lecture seule)
		args[ 0 ] = événement ;

		for ( je = 1; je < arguments.longueur; je++ ) {
			args[ je ] = arguments[ je ] ;
		}

		event.delegateTarget = this ;

		// Appelez le crochet preDispatch pour le type mappé, et laissez-le se libérer si vous le souhaitez
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			retourner;
		}

		// Déterminer les gestionnaires
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Exécuter les délégués en premier ; ils peuvent vouloir arrêter la propagation sous nous
		je = 0 ;
		while ( ( correspond = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem ;

			j = 0 ;
			tandis que ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Si l'événement est dans un espace de noms, alors chaque gestionnaire n'est appelé que s'il est
				// spécialement universel ou ses espaces de noms sont un sur-ensemble de l'événement.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj ;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					si ( ret !== indéfini ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Appel du hook postDispatch pour le type mappé
		si ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	gestionnaires : fonction (événement, gestionnaires) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = événement.cible ;

		// Trouver les gestionnaires délégués
		si ( nombre de délégués &&

			// Prise en charge : Internet Explorer <=9
			// Arbres d'instance SVG <use> trou noir (trac-13180)
			cur.nodeType &&

			// Prise en charge : Firefox <=42
			// Supprime les clics violant les spécifications indiquant un bouton de pointeur non principal (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Prise en charge : IE 11 uniquement
			// ...mais pas les "clics" des touches fléchées des entrées radio, qui peuvent avoir `bouton` -1 (gh-2343)
			!( event.type === "clic" && event.button >= 1 ) ) {

			for (; cur !== this; cur = cur.parentNode || this ) {

				// Ne vérifie pas les non-éléments (#13208)
				// Ne traite pas les clics sur les éléments désactivés (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [] ;
					matchedSelectors = {} ;
					pour ( je = 0; je < nombre de délégués; je ++ ) {
						handleObj = handlers[ i ] ;

						// N'entre pas en conflit avec les propriétés d'Object.prototype (#13203)
						sel = handleObj.selector + " " ;

						if (matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if (matchedSelectors[sel]) {
							matchedHandlers.push( handleObj );
						}
					}
					si (matchedHandlers.length) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Ajoute les gestionnaires restants (liés directement)
		cur = ceci ;
		si (déléguéCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegationCount ) } );
		}

		gestionnaire de retourQueue ;
	},

	addProp : fonction (nom, crochet) {
		Object.defineProperty( jQuery.Event.prototype, nom, {
			énumérable : vrai,
			paramétrable : vrai,

			obtenir : isFunction( hook ) ?
				une fonction() {
					si ( this.originalEvent ) {
						crochet de retour (this.originalEvent);
					}
				} :
				une fonction() {
					si ( this.originalEvent ) {
						retourne this.originalEvent[ nom ] ;
					}
				},

			ensemble : fonction (valeur) {
				Object.defineProperty( this, name, {
					énumérable : vrai,
					paramétrable : vrai,
					inscriptible : vrai,
					valeur : valeur
				} );
			}
		} );
	},

	correction : function( originalEvent ) {
		retourner originalEvent[ jQuery.expando ] ?
			événement d'origine :
			nouveau jQuery.Event( originalEvent );
	},

	spécial: {
		charge: {

			// Empêcher les événements image.load déclenchés de se propager à window.load
			pas de bulle : vrai
		},
		Cliquez sur: {

			// Utiliser l'événement natif pour garantir l'état correct des entrées vérifiables
			configuration : fonction (données) {

				// Pour une compressibilité mutuelle avec _default, remplacez `this` access par une variable locale.
				// `|| data` est un code mort destiné uniquement à préserver la variable par minification.
				var el = ceci || Les données;

				// Réclamer le premier gestionnaire
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					levierNative( el, "clic", returnTrue );
				}

				// Renvoie false pour permettre un traitement normal dans l'appelant
				retourner faux ;
			},
			déclencheur : fonction (données) {

				// Pour une compressibilité mutuelle avec _default, remplacez `this` access par une variable locale.
				// `|| data` est un code mort destiné uniquement à préserver la variable par minification.
				var el = ceci || Les données;

				// Force la configuration avant de déclencher un clic
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					levierNative( el, "clic" );
				}

				// Renvoie non faux pour permettre la propagation normale du chemin d'événement
				retourner vrai ;
			},

			// Pour la cohérence entre navigateurs, supprimez le .click() natif sur les liens
			// L'empêcher également si nous sommes actuellement à l'intérieur d'une pile d'événements natifs à effet de levier
			_default : fonction (événement) {
				var cible = événement.cible ;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( cible, "clic" ) ||
					nodeName( cible, "a" );
			}
		},

		avant le déchargement : {
			postDispatch : fonction (événement) {

				// Prise en charge : Firefox 20+
				// Firefox n'alerte pas si le champ returnValue n'est pas défini.
				if ( event.result !== non défini && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
} ;

// S'assure de la présence d'un écouteur d'événement qui gère les événements déclenchés manuellement
// événements synthétiques en interrompant la progression jusqu'à ce qu'ils soient réinvoqués en réponse à
// événements *natifs* qu'il déclenche directement, garantissant que les changements d'état ont
// s'est déjà produit avant que d'autres écouteurs ne soient invoqués.
function levierNative( el, type, expectSync ) {

	// Missing expectSync indique un appel de déclencheur, qui doit forcer la configuration via jQuery.event.add
	si ( !attendezSync ) {
		si ( dataPriv.get( el, type ) === indéfini ) {
			jQuery.event.add( el, type, returnTrue );
		}
		retourner;
	}

	// Enregistre le contrôleur en tant que gestionnaire universel spécial pour tous les espaces de noms d'événements
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		espace de noms : faux,
		gestionnaire : fonction (événement) {
			var notAsync, résultat,
				enregistré = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrompre le traitement de l'événement externe synthétique .trigger()ed
				// Les données enregistrées doivent être fausses dans de tels cas, mais peuvent être un objet de capture restant
				// à partir d'un gestionnaire natif asynchrone (gh-4350)
				if ( !saved.length ) {

					// Stocke les arguments à utiliser lors de la gestion de l'événement natif interne
					// Il y aura toujours au moins un argument (un objet événement), donc ce tableau
					// ne sera pas confondu avec un objet de capture restant.
					enregistré = slice.call( arguments );
					dataPriv.set( this, type, enregistré );

					// Déclenche l'événement natif et capture son résultat
					// Prise en charge : IE <=9 - 11+
					// focus() et blur() sont asynchrones
					notAsync = expectSync( this, type );
					ce type ]();
					result = dataPriv.get( this, type );
					if ( enregistré !== résultat || notAsync ) {
						dataPriv.set( this, type, false );
					} autre {
						résultat = {} ;
					}
					si (sauvegardé !== résultat) {

						// Annule l'événement synthétique externe
						event.stopImmediatePropagation();
						event.preventDefault();

						// Prise en charge : Chrome 86+
						// Dans Chrome, si un élément ayant un gestionnaire focusout est flouté par
						// en cliquant en dehors de celui-ci, il appelle le gestionnaire de manière synchrone. Si
						// ce gestionnaire appelle `.remove()` sur l'élément, les données sont effacées,
						// laissant `result` indéfini. Nous devons nous prémunir contre cela.
						renvoie le résultat && result.value;
					}

				// S'il s'agit d'un événement synthétique interne pour un événement avec un substitut bouillonnant
				// (mise au point ou flou), supposons que le substitut s'est déjà propagé à partir du déclenchement du
				// événement natif et empêcher que cela se reproduise ici.
				// Cela donne techniquement un mauvais ordre à `.trigger()` (dans lequel le
				// le substitut bouillonnant se propage *après* la base non bouillonnante), mais cela semble
				// moins mauvais que la duplication.
				} sinon si ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// S'il s'agit d'un événement natif déclenché ci-dessus, tout est maintenant en ordre
			// Déclenche un événement synthétique interne avec les arguments d'origine
			} sinon si (sauvé.longueur) {

				// ...et capture le résultat
				dataPriv.set( this, type, {
					valeur : jQuery.event.trigger(

						// Prise en charge : IE <=9 - 11+
						// Étendre avec le prototype pour réinitialiser le stopImmediatePropagation() ci-dessus
						jQuery.extend( enregistré[ 0 ], jQuery.Event.prototype ),
						save.slice( 1 ),
						ce
					)
				} );

				// Abandon de la gestion de l'événement natif
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = fonction (élément, type, poignée) {

	// Ce "if" est nécessaire pour les objets simples
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
} ;

jQuery.Event = function( src, props ) {

	// Autorise l'instanciation sans le mot clé 'new'
	if ( !( cette instance de jQuery.Event ) ) {
		renvoie un nouveau jQuery.Event( src, props );
	}

	// Objet événement
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Les événements bouillonnant dans le document ont peut-être été marqués comme empêchés
		// par un gestionnaire plus bas dans l'arborescence ; refléter la valeur correcte.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === non défini &&

				// Prise en charge : Android <=2.3 uniquement
				src.returnValue === faux ?
			returnTrue :
			returnFalse;

		// Créer des propriétés cibles
		// Prise en charge : Safari <=6 - 7 uniquement
		// La cible ne doit pas être un nœud de texte (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.cible.parentNode :
			src.cible ;

		this.currentTarget = src.currentTarget ;
		this.relatedTarget = src.relatedTarget ;

	// Type d'événement
	} autre {
		this.type = src;
	}

	// Placer les propriétés explicitement fournies sur l'objet événement
	si (accessoires) {
		jQuery.extend( this, props );
	}

	// Crée un horodatage si l'événement entrant n'en a pas
	this.timeStamp = src && src.timeStamp || Date.maintenant();

	// Marquez-le comme corrigé
	this[ jQuery.expando ] = vrai ;
} ;

// jQuery.Event est basé sur les événements DOM3 comme spécifié par la liaison de langage ECMAScript
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructeur : jQuery.Event,
	isDefaultPrevented : returnFalse,
	isPropagationStopped : returnFalse,
	isImmediatePropagationStopped : returnFalse,
	est simulé : faux,

	preventDefault : fonction() {
		var e = this.originalEvent ;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation : fonction() {
		var e = this.originalEvent ;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation : fonction() {
		var e = this.originalEvent ;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
} ;

// Inclut tous les accessoires d'événement courants, y compris les accessoires spécifiques KeyEvent et MouseEvent
jQuery.each( {
	AltKey : vrai,
	bulles : vrai,
	annulable : vrai,
	touches modifiées : vrai,
	ctrlKey : vrai,
	détail : vrai,
	eventPhase : vrai,
	metaKey : vrai,
	pageX : vrai,
	pageY : vrai,
	shiftKey : vrai,
	vue : vrai,
	"char": vrai,
	code : vrai,
	charCode : vrai,
	clé : vrai,
	keyCode : vrai,
	bouton : vrai,
	boutons : vrai,
	clientX : vrai,
	client : vrai,
	décalageX : vrai,
	décalageY : vrai,
	ID du pointeur : vrai,
	pointerType : vrai,
	screenX : vrai,
	screenY : vrai,
	Touches cibles : vrai,
	toElement : vrai,
	touche : vrai,
	lequel : vrai
}, jQuery.event.addProp );

jQuery.each( { focus : "focusin", blur : "focusout" }, function( type, type délégué ) {
	jQuery.event.special[ type ] = {

		// Utiliser l'événement natif si possible pour que la séquence flou/mise au point soit correcte
		configuration : fonction() {

			// Réclamer le premier gestionnaire
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverNative( this, type, expectSync );

			// Renvoie false pour permettre un traitement normal dans l'appelant
			retourner faux ;
		},
		déclencheur : fonction() {

			// Forcer la configuration avant le déclencheur
			levierNative( this, type );

			// Renvoie non faux pour permettre la propagation normale du chemin d'événement
			retourner vrai ;
		},

		// Supprime la mise au point native ou le flou car il est déjà déclenché
		// dans effet de levierNatif.
		_default : fonction() {
			retourner vrai ;
		},

		TypeDélégué : TypeDélégué
	} ;
} );

// Crée des événements mouseenter/leave à l'aide de mouseover/out et de vérifications de l'heure de l'événement
// pour que la délégation d'événement fonctionne dans jQuery.
// Faites de même pour pointerenter/pointerleave et pointerover/pointerout
//
// Prise en charge : Safari 7 uniquement
// Safari envoie mouseenter trop souvent ; voir:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// pour la description du bogue (il existait également dans les anciennes versions de Chrome).
jQuery.each( {
	mouseenter : "mouseover",
	mouseleave : "mouseout",
	pointerenter : "pointerover",
	pointerleave : "pointerout"
}, fonction (origine, correction) {
	jQuery.event.special[ orig ] = {
		type_délégué : fixe,
		type de liaison : réparer,

		gérer : fonction (événement) {
			var ret,
				cible = ceci,
				Related = événement. RelatedTarget,
				handleObj = événement.handleObj ;

			// Pour mouseenter/leave appeler le gestionnaire si related est en dehors de la cible.
			// NB : Pas de cible associée si la souris a quitté/entré dans la fenêtre du navigateur
			if ( !lié || ( lié !== cible && !jQuery.contains( cible, lié ) ) ) {
				event.type = handleObj.origType ;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			retour ret;
		}
	} ;
} );

jQuery.fn.extend( {

	on : fonction (types, sélecteur, données, fn) {
		return on( this, types, selector, data, fn );
	},
	un : fonction (types, sélecteur, données, fn) {
		return on( this, types, selector, data, fn, 1 );
	},
	off : fonction (types, sélecteur, fn) {
		var handleObj, type ;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( événement ) envoyé jQuery.Event
			handleObj = types.handleObj ;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			retournez ceci;
		}
		si ( typeof types === "objet" ) {

			// ( types-objet [, sélecteur] )
			pour (taper les types) {
				this.off( type, sélecteur, types[ type ] );
			}
			retournez ceci;
		}
		if ( selector === false || typeof selector === "fonction" ) {

			// ( types [, fn] )
			fn = sélecteur ;
			sélecteur = indéfini ;
		}
		si ( fn === faux ) {
			fn = retourFaux ;
		}
		return this.each( fonction() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Prise en charge : IE <=10 - 11, Edge 12 - 13 uniquement
	// Dans IE/Edge, l'utilisation de groupes regex ici provoque de graves ralentissements.
	// Voir https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<lien/i,

	// coché="coché" ou coché
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Préférez un tbody à sa table parent pour contenir de nouvelles lignes
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || élément ;
	}

	élément de retour ;
}

// Remplace/restaure l'attribut type des éléments de script pour une manipulation DOM sécurisée
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	élément de retour ;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} autre {
		elem.removeAttribute( "type" );
	}

	élément de retour ;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, événements ;

	if ( dest.nodeType !== 1 ) {
		retourner;
	}

	// 1. Copiez les données privées : événements, gestionnaires, etc.
	si ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events ;

		si ( événements ) {
			dataPriv.remove( dest, "gérer les événements" );

			for (tapez des événements) {
				for ( je = 0, l = événements[ type ].length; je < l; je++ ) {
					jQuery.event.add( destination, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copier les données utilisateur
	si ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Correction des bogues IE, voir les tests de support
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Échec de la persistance de l'état coché d'une case à cocher ou d'un bouton radio cloné.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Échec du retour de l'option sélectionnée à l'état sélectionné par défaut lors du clonage des options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue ;
	}
}

function domManip( collection, args, rappel, ignoré ) {

	// Aplatir tous les tableaux imbriqués
	args = flat( args );

	var fragment, premier, scripts, hasScripts, noeud, doc,
		je = 0,
		l = collection.longueur,
		inNoClone = l - 1,
		valeur = args[ 0 ],
		valeurEstFonction = estFonction( valeur );

	// Nous ne pouvons pas cloner les fragments de Node contenant coché, dans WebKit
	si ( valeurEstFonction ||
			( l > 1 && type de valeur === "chaîne" &&
				!support.checkClone && rchecked.test( valeur ) ) ) {
		return collection.each( fonction( index ) {
			var self = collection.eq( index );
			si ( valeurEstFonction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( soi, args, rappel, ignoré );
		} );
	}

	si ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignoré );
		premier = fragment.firstChild ;

		si (fragment.childNodes.length === 1) {
			fragment = premier ;
		}

		// Nécessite soit un nouveau contenu, soit un intérêt pour les éléments ignorés pour invoquer le rappel
		si ( premier || ignoré ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.longueur ;

			// Utilise le fragment d'origine pour le dernier élément
			// au lieu du premier car il peut finir
			// étant vidé de manière incorrecte dans certaines situations (#8070).
			pour (; je < l; je++ ) {
				noeud = fragment ;

				if ( je !== iNoClone ) {
					nœud = jQuery.clone( nœud, vrai, vrai );

					// Conserver les références aux scripts clonés pour une restauration ultérieure
					si ( hasScripts ) {

						// Prise en charge : Android <= 4.0 uniquement, PhantomJS 1 uniquement
						// push.apply(_, arraylike) lance sur l'ancien WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ je ], nœud, je );
			}

			si ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Réactiver les scripts
				jQuery.map( scripts, restoreScript );

				// Évalue les scripts exécutables lors de la première insertion de document
				for ( je = 0; je < hasScripts; je++ ) {
					nœud = scripts[ je ] ;
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( nœud, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase() !== "module" ) {

							// Dépendance AJAX facultative, mais n'exécutera pas les scripts s'ils ne sont pas présents
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce : nœud.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} autre {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	collecte des retours ;
}

function remove( elem, selector, keepData ) {
	nœud var,
		nœuds = sélecteur ? jQuery.filter( selector, elem ) : elem,
		je = 0 ;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( nœud, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	élément de retour ;
}

jQuery.extend( {
	htmlPréfiltre : function( html ) {
		retourner html ;
	},

	clone: ​​function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( vrai ),
			inPage = isAttached( elem );

		// Correction des problèmes de clonage IE
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( élément ) ) {

			// Nous évitons Sizzle ici pour des raisons de performances : https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			pour ( je = 0, l = srcElements.length; je < l; je++ ) {
				fixInput( srcElements[ je ], destElements[ je ] );
			}
		}

		// Copie les événements de l'original vers le clone
		si (donnéesEtEvents) {
			si ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				pour ( je = 0, l = srcElements.length; je < l; je++ ) {
					cloneCopyEvent( srcElements[ je ], destElements[ je ] );
				}
			} autre {
				cloneCopyEvent( elem, clone );
			}
		}

		// Conserver l'historique d'évaluation des scripts
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Retourne l'ensemble cloné
		clone de retour ;
	},

	cleanData : fonction (éléments) {
		données var, elem, type,
			special = jQuery.event.special,
			je = 0 ;

		for ( ; ( elem = elems[ i ] ) !== indéfini ; i++ ) {
			si ( acceptData( elem ) ) {
				si ( ( données = elem[ dataPriv.expando ] ) ) {
					si ( données. événements ) {
						for (tapez data.events) {
							si ( spécial[ type ] ) {
								jQuery.event.remove( élément, type );

							// Ceci est un raccourci pour éviter la surcharge de jQuery.event.remove
							} autre {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Prise en charge : Chrome <=35 - 45+
					// Attribuer undefined au lieu d'utiliser delete, voir Data#remove
					elem[ dataPriv.expando ] = non défini ;
				}
				if ( elem[ dataUser.expando ] ) {

					// Prise en charge : Chrome <=35 - 45+
					// Attribuer undefined au lieu d'utiliser delete, voir Data#remove
					elem[ dataUser.expando ] = non défini ;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	détacher : fonction (sélecteur) {
		return remove( this, selector, true );
	},

	supprimer : fonction (sélecteur) {
		return remove( this, selector );
	},

	texte : fonction (valeur) {
		return access( this, function( value ) {
			valeur de retour === indéfini ?
				jQuery.text( this ) :
				this.empty().each( fonction() {
					si ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = valeur ;
					}
				} );
		}, null, valeur, arguments.length );
	},

	ajouter : fonction() {
		return domManip( this, arguments, function( elem ) {
			si ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var cible = manipulationTarget( this, elem );
				cible.appendChild( elem );
			}
		} );
	},

	ajouter : fonction() {
		return domManip( this, arguments, function( elem ) {
			si ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var cible = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	avant : fonction() {
		return domManip( this, arguments, function( elem ) {
			si ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	après : fonction() {
		return domManip( this, arguments, function( elem ) {
			si ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	vide : fonction() {
		var élément,
			je = 0 ;

		for ( ; ( elem = this[ je ] ) != null; je++ ) {
			si ( elem.nodeType === 1 ) {

				// Empêche les fuites de mémoire
				jQuery.cleanData( getAll( elem, false ) );

				// Supprimer tous les nœuds restants
				elem.textContent = "" ;
			}
		}

		retournez ceci;
	},

	cloner : function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		retourner this.map( fonction() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html : fonction (valeur) {
		return access( this, function( value ) {
			var élément = this[ 0 ] || {},
				je = 0,
				l = cette.longueur ;

			if ( valeur === non défini && elem.nodeType === 1 ) {
				retourner elem.innerHTML ;
			}

			// Voir si nous pouvons prendre un raccourci et simplement utiliser innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( valeur ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				valeur = jQuery.htmlPrefilter( valeur );

				essayer {
					pour (; je < l; je++ ) {
						elem = this[ je ] || {} ;

						// Supprime les nœuds d'éléments et évite les fuites de mémoire
						si ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = valeur ;
						}
					}

					élém = 0 ;

				// Si l'utilisation de innerHTML lève une exception, utilisez la méthode de secours
				} attraper ( e ) {}
			}

			si (élément) {
				this.empty().append( valeur );
			}
		}, null, valeur, arguments.length );
	},

	remplacer par : fonction() {
		var ignoré = [] ;

		// Effectue les modifications en remplaçant chaque élément de contexte non ignoré par le nouveau contenu
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( ceci, ignoré ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				si (parent) {
					parent.replaceChild( elem, this );
				}
			}

		// Forcer l'invocation du rappel
		}, ignoré );
	}
} );

jQuery.each( {
	appendTo : "ajouter",
	prependTo : "préfixer",
	insertBefore : "avant",
	insertAfter : "après",
	replaceAll : "remplacer par"
}, fonction (nom, original) {
	jQuery.fn[ nom ] = fonction( sélecteur ) {
		var éléments,
			ret = [],
			insert = jQuery( sélecteur ),
			dernier = insert.longueur - 1,
			je = 0 ;

		for ( ; je <= dernier; je++ ) {
			éléments = je === dernier ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Prise en charge : Android <= 4.0 uniquement, PhantomJS 1 uniquement
			// .get() car push.apply(_, arraylike) lance sur l'ancien WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	} ;
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[az%]+$", "i" );

var getStyles = fonction (élément) {

		// Prise en charge : IE <=11 uniquement, Firefox <=30 (#15098, #14150)
		// IE jette sur les éléments créés dans les popups
		// FF lance quant à lui des éléments de cadre via "defaultView.getComputedStyle"
		var vue = elem.ownerDocument.defaultView ;

		if ( !vue || !vue.ouvreur ) {
			vue = fenêtre ;
		}

		return view.getComputedStyle( elem );
	} ;

var swap = fonction (élément, options, rappel) {
	var ret, nom,
		ancien = {} ;

	// Rappelle les anciennes valeurs et insère les nouvelles
	pour ( nom dans les options ) {
		old[ nom ] = elem.style[ nom ] ;
		elem.style[ nom ] = options[ nom ] ;
	}

	ret = callback.call( elem );

	// Rétablit les anciennes valeurs
	pour ( nom dans les options ) {
		elem.style[ nom ] = ancien[ nom ] ;
	}

	retour ret;
} ;


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( une fonction() {

	// L'exécution des tests pixelPosition et boxSizingReliable nécessite une seule mise en page
	// afin qu'ils soient exécutés en même temps pour enregistrer le deuxième calcul.
	fonction calculeStyleTests() {

		// Ceci est un singleton, nous ne devons l'exécuter qu'une seule fois
		si ( !div ) {
			retourner;
		}

		container.style.cssText = "position :absolue;gauche :-11111px ;largeur :60px ;" +
			"margin-top:1px;padding:0;border:0" ;
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll ;" +
			"marge : auto ; bordure : 1 px ; rembourrage : 1 px ;" +
			"largeur : 60 % ; haut : 1 %" ;
		documentElement.appendChild( conteneur ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%" ;

		// Prise en charge : Android 4.0 - 4.3 uniquement, Firefox <=3 - 44
		fiableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Prise en charge : Android 4.0 - 4.3 uniquement, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Certains styles reviennent avec des valeurs en pourcentage, même s'ils ne devraient pas
		div.style.right = "60 %" ;
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Prise en charge : IE 9 - 11 uniquement
		// Détecter les erreurs de déclaration des dimensions de contenu pour les éléments box-sizing:border-box
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Prise en charge : IE 9 uniquement
		// Détecter le débordement : faire défiler les erreurs (gh-3699)
		// Compatibilité : Chrome <=64
		// Ne soyez pas trompé lorsque le zoom affecte offsetWidth (gh-4029)
		div.style.position = "absolu" ;
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( conteneur );

		// Annulez la div pour qu'elle ne soit pas stockée dans la mémoire et
		// ce sera aussi un signe que les vérifications ont déjà été effectuées
		div = nul ;
	}

	function roundPixelMeasures( mesure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		fiableTrDimensionsVal, fiableMarginLeftVal,
		conteneur = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Terminer tôt dans des environnements limités (sans navigateur)
	si ( !div.style ) {
		retourner;
	}

	// Prise en charge : IE <=9 - 11 uniquement
	// Le style de l'élément cloné affecte l'élément source cloné (#8908)
	div.style.backgroundClip = "contenu-box" ;
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box" ;

	jQuery.extend( prend en charge, {
		boxSizingReliable : fonction() {
			calculateStyleTests();
			return boxSizingReliableVal ;
		},
		pixelBoxStyles : fonction() {
			calculateStyleTests();
			renvoie pixelBoxStylesVal ;
		},
		pixelPosition : fonction() {
			calculateStyleTests();
			renvoie pixelPositionVal ;
		},
		fiableMarginLeft : fonction() {
			calculateStyleTests();
			retourner fiableMarginLeftVal ;
		},
		scrollboxSize : fonction() {
			calculateStyleTests();
			return scrollboxSizeVal ;
		},

		// Prise en charge : IE 9 - 11+, Edge 15 - 18+
		// IE/Edge rapporte incorrectement `getComputedStyle` des lignes de table avec largeur/hauteur
		// défini dans CSS alors que les propriétés `offset*` rapportent des valeurs correctes.
		// Le comportement dans IE 9 est plus subtil que dans les versions plus récentes et il passe
		// certaines versions de ce test ; veillez à ne pas le faire passer par là !
		//
		// Prise en charge : Firefox 70+
		// Seul Firefox inclut les largeurs de bordure
		// dans les dimensions calculées. (gh-4529)
		fiableTrDimensions : fonction() {
			var table, tr, trEnfant, trStyle ;
			si ( fiableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;gauche:-11111px;border-collapse:separate" ;
				tr.style.cssText = "border:1px solid" ;

				// Prise en charge : Chrome 86+
				// La hauteur définie via cssText n'est pas appliquée.
				// La hauteur calculée revient alors à 0.
				tr.style.height = "1px" ;
				trChild.style.height = "9px" ;

				// Prise en charge : Android 8 Chrome 86+
				// Dans notre iframe bodyBackground.html,
				// l'affichage de tous les éléments div est défini sur "inline",
				// qui pose un problème uniquement sous Android 8 Chrome 86.
				// S'assurer que la div est affichée : bloc
				// contourne ce problème.
				trChild.style.display = "bloquer" ;

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				fiableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			retourner fiableTrDimensionsVal ;
		}
	} );
} )();


function curCSS( elem, nom, calculé ) {
	var largeur, minWidth, maxWidth, ret,

		// Prise en charge : Firefox 51+
		// Récupération du style avant d'être calculé d'une manière ou d'une autre
		// corrige un problème d'obtention de valeurs erronées
		// sur les éléments détachés
		style = elem.style;

	calculé = calculé || getStyles( elem );

	// getPropertyValue est nécessaire pour :
	// .css('filter') (IE 9 uniquement, #12537)
	// .css('--propriétépersonnalisée) (#3144)
	si ( calculé ) {
		ret = computed.getPropertyValue( nom ) || calculé[ nom ] ;

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, nom );
		}

		// Un hommage au "génial hack de Dean Edwards"
		// Le navigateur Android renvoie un pourcentage pour certaines valeurs,
		// mais la largeur semble être de manière fiable en pixels.
		// C'est contre le projet de spécification CSSOM :
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Rappel des valeurs d'origine
			largeur = style.largeur ;
			minLargeur = style.minLargeur ;
			maxLargeur = style.maxLargeur ;

			// Insérez les nouvelles valeurs pour obtenir une valeur calculée
			style.minWidth = style.maxWidth = style.width = ret ;
			ret = largeur.calculée ;

			// Rétablit les valeurs modifiées
			style.width = largeur;
			style. minLargeur = minLargeur ;
			style.maxWidth = maxWidth;
		}
	}

	retour ret !== indéfini ?

		// Prise en charge : IE <=9 - 11 uniquement
		// IE renvoie la valeur zIndex sous la forme d'un entier.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Définissez le crochet, nous vérifierons à la première exécution s'il est vraiment nécessaire.
	retourner {
		obtenir : fonction() {
			si ( conditionFn() ) {

				// Hook non nécessaire (ou il n'est pas possible de l'utiliser à cause
				// à la dépendance manquante), supprimez-la.
				supprimer this.get ;
				retourner;
			}

			// Crochet nécessaire ; redéfinissez-le afin que le test de support ne soit pas exécuté à nouveau.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	} ;
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendeurProps = {} ;

// Retourne une propriété préfixée par le fournisseur ou non définie
fonction vendorPropName( nom ) {

	// Vérifie les noms préfixés des fournisseurs
	var capName = nom[ 0 ].toUpperCase() + nom.tranche( 1 ),
		i = cssPrefixes.longueur ;

	alors que je-- ) {
		nom = cssPrefixes[ i ] + capName ;
		if ( nom dans emptyStyle ) {
			nom de retour ;
		}
	}
}

// Renvoie un jQuery.cssProps potentiellement mappé ou une propriété préfixée par le fournisseur
function NomProp final( nom ) {
	var final = jQuery.cssProps[ nom ] || vendeurProps[ nom ] ;

	si (final) {
		retour final;
	}
	if ( nom dans emptyStyle ) {
		nom de retour ;
	}
	return vendorProps[ nom ] = vendorPropName( nom ) || Nom;
}


var

	// Permutable si display est none ou commence par table
	// sauf "table", "table-cell" ou "table-caption"
	// Voir ici pour les valeurs d'affichage : https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(aucun|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position : "absolu", visibilité : "caché", affichage : "bloc" },
	cssNormalTransform = {
		Espacement des lettres : "0",
		fontWeight : "400"
	} ;

function setPositiveNumber( _elem, value, subtract ) {

	// Toutes les valeurs relatives (+/-) ont déjà été
	// normalisé à ce stade
	var matches = rcssNum.exec( value );
	matchs retour ?

		// Protégez-vous contre la "soustraction" indéfinie, par exemple, lorsqu'il est utilisé comme dans cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		évaluer;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var je = dimension === "largeur" ​​? dix,
		supplémentaire = 0,
		delta = 0 ;

	// Un ajustement peut ne pas être nécessaire
	if ( box === ( isBorderBox ? "border" : "content") ) {
		renvoie 0 ;
	}

	pour ( ; je < 4; je += 2 ) {

		// Les deux modèles de boîte excluent la marge
		si (boîte === "marge" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// Si nous arrivons ici avec une content-box, nous recherchons "padding" ou "border" ou "margin"
		si ( !isBorderBox ) {

			// Ajouter un rembourrage
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// Pour "border" ou "margin", ajouter une bordure
			si (boîte !== "remplissage" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// Mais gardez toujours une trace sinon
			} autre {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// Si on arrive ici avec une border-box (content + padding + border), on cherche "content" ou
		// "padding" ou "marge"
		} autre {

			// Pour "contenu", soustraire le rembourrage
			if ( box === "contenu" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// Pour "content" ou "padding", soustraire border
			si (boîte !== "marge" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Tenez compte de la gouttière de défilement positive de la boîte de contenu lorsqu'elle est demandée en fournissant computedVal
	si ( !isBorderBox && valeur calculée >= 0 ) {

		// offsetWidth/offsetHeight est une somme arrondie du contenu, du rembourrage, de la gouttière de défilement et de la bordure
		// En supposant une gouttière de défilement entière, soustrayez le reste et arrondissez à l'inférieur
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			valeurcalculée -
			delta -
			supplémentaire -
			0,5

		// Si offsetWidth/offsetHeight est inconnu, alors nous ne pouvons pas déterminer la gouttière de défilement de la boîte de contenu
		// Utilisez un zéro explicite pour éviter NaN (gh-3964)
		) ) || 0 ;
	}

	delta de retour ;
}

function getWidthOrHeight( élément, dimension, extra ) {

	// Commencer avec le style calculé
	var styles = getStyles( elem ),

		// Pour éviter de forcer un reflow, ne récupérez boxSizing que si nous en avons besoin (gh-4322).
		// Fake content-box jusqu'à ce que nous sachions qu'il est nécessaire de connaître la vraie valeur.
		boxSizingNeeded = !support.boxSizingReliable() || supplémentaire,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = estBorderBox,

		val = curCSS( élément, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Prise en charge : Firefox <=54
	// Renvoie une valeur non pixelisée confondante ou feint l'ignorance, selon le cas.
	si ( rnumnonpx. test ( val ) ) {
		si ( ! supplémentaire ) {
			valeur de retour ;
		}
		val = "auto" ;
	}


	// Prise en charge : IE 9 - 11 uniquement
	// Utilisez offsetWidth/offsetHeight lorsque le dimensionnement de la boîte n'est pas fiable.
	// Dans ces cas, la valeur calculée peut être considérée comme border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Prise en charge : IE 10 - 11+, Edge 15 - 18+
		// IE/Edge rapporte incorrectement `getComputedStyle` des lignes de table avec largeur/hauteur
		// défini dans CSS alors que les propriétés `offset*` rapportent des valeurs correctes.
		// Fait intéressant, dans certains cas, IE 9 ne souffre pas de ce problème.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Revient à offsetWidth/offsetHeight lorsque la valeur est "auto"
		// Cela se produit pour les éléments en ligne sans paramètre explicite (gh-3571)
		valeur === "auto" ||

		// Prise en charge : Android <=4.1 - 4.3 uniquement
		// Utilisez également offsetWidth/offsetHeight pour les dimensions en ligne erronées (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Assurez-vous que l'élément est visible et connecté
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box" ;

		// Le cas échéant, offsetWidth/offsetHeight approximativement les dimensions de la bordure.
		// Lorsqu'il n'est pas disponible (par exemple, SVG), supposez un dimensionnement de boîte non fiable et interprétez le
		// valeur récupérée en tant que dimension de zone de contenu.
		valueIsBorderBox = offsetProp dans elem ;
		si ( valueIsBorderBox ) {
			val = elem[ offsetProp ] ;
		}
	}

	// Normaliser "" et auto
	val = parseFloat( val ) || 0 ;

	// Ajustement pour le modèle de boîte de l'élément
	retour ( val +
		boxModelAdjustment(
			élément,
			dimension,
			supplémentaire || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			modes,

			// Fournit la taille calculée actuelle pour demander le calcul de la gouttière de défilement (gh-3589)
			val
		)
	) + "px" ;
}

jQuery.extend( {

	// Ajoute des crochets de propriété de style pour remplacer la valeur par défaut
	// comportement d'obtention et de définition d'une propriété de style
	cssHooks : {
		opacité : {
			obtenir : fonction (élément, calculé) {
				si ( calculé ) {

					// Nous devrions toujours récupérer un nombre à partir de l'opacité
					var ret = curCSS( elem, "opacity" );
					retour ret === "" ? "1" : ret ;
				}
			}
		}
	},

	// N'ajoute pas automatiquement "px" à ces propriétés éventuellement sans unité
	numérocss : {
		"animationIterationCount": vrai,
		"columnCount": vrai,
		"fillOpacity": vrai,
		"flexGrow": vrai,
		"flexShrink": vrai,
		"fontWeight": vrai,
		"gridArea": ​​vrai,
		"gridColumn": vrai,
		"gridColumnEnd": vrai,
		"gridColumnStart": vrai,
		"gridRow": vrai,
		"gridRowEnd": vrai,
		"gridRowStart": vrai,
		"lineHeight": vrai,
		"opacité": vrai,
		"ordre": vrai,
		"orphelins": vrai,
		"veuves": vrai,
		"zIndex": vrai,
		"zoom": vrai
	},

	// Ajoutez les propriétés dont vous souhaitez corriger les noms avant
	// définition ou obtention de la valeur
	cssProps : {},

	// Récupère et définit la propriété de style sur un nœud DOM
	style : fonction (élément, nom, valeur, extra) {

		// Ne pas définir de styles sur les nœuds de texte et de commentaire
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			retourner;
		}

		// Assurez-vous que nous travaillons avec le bon nom
		var ret, type, crochets,
			origName = camelCase( nom ),
			isCustomProp = rcustomProp.test( nom ),
			style = elem.style;

		// Assurez-vous que nous travaillons avec le bon nom. Nous ne
		// veut interroger la valeur s'il s'agit d'une propriété personnalisée CSS
		// puisqu'ils sont définis par l'utilisateur.
		if ( !isCustomProp ) {
			nom = finalPropName( origName );
		}

		// Obtient le crochet pour la version préfixée, puis la version sans préfixe
		crochets = jQuery.cssHooks[ nom ] || jQuery.cssHooks[ nom_origine ] ;

		// Vérifie si nous définissons une valeur
		si ( valeur !== indéfini ) {
			type = type de valeur ;

			// Convertit "+=" ou "-=" en nombres relatifs (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				valeur = adjustCSS( elem, nom, ret );

				// Corrige le bug #9237
				type = "nombre" ;
			}

			// Assurez-vous que les valeurs null et NaN ne sont pas définies (#7116)
			if ( valeur == null || valeur !== valeur ) {
				retourner;
			}

			// Si un nombre a été passé, ajouter l'unité (sauf pour certaines propriétés CSS)
			// La vérification isCustomProp peut être supprimée dans jQuery 4.0 lorsque nous ajoutons uniquement automatiquement
			// "px" à quelques valeurs codées en dur.
			if ( type === "nombre" && !isCustomProp ) {
				valeur += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// les props background-* affectent les valeurs du clone d'origine
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ nom ] = "hériter" ;
			}

			// Si un crochet a été fourni, utilisez cette valeur, sinon définissez simplement la valeur spécifiée
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				si ( estCustomProp ) {
					style.setProperty( nom, valeur );
				} autre {
					style[ nom ] = valeur ;
				}
			}

		} autre {

			// Si un crochet a été fourni, obtenir la valeur non calculée à partir de là
			si ( crochets && "obtenir" dans les crochets &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				retour ret;
			}

			// Sinon, obtenez simplement la valeur de l'objet de style
			style de retour[ nom ] ;
		}
	},

	css : fonction (élément, nom, extra, styles) {
		var val, num, crochets,
			origName = camelCase( nom ),
			isCustomProp = rcustomProp.test( nom );

		// Assurez-vous que nous travaillons avec le bon nom. Nous ne
		// souhaite modifier la valeur s'il s'agit d'une propriété personnalisée CSS
		// puisqu'ils sont définis par l'utilisateur.
		if ( !isCustomProp ) {
			nom = finalPropName( origName );
		}

		// Essayez le nom préfixé suivi du nom sans préfixe
		crochets = jQuery.cssHooks[ nom ] || jQuery.cssHooks[ nom_origine ] ;

		// Si un crochet a été fourni, obtenir la valeur calculée à partir de là
		if ( hooks && "get" dans les hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Sinon, s'il existe un moyen d'obtenir la valeur calculée, utilisez-le
		si ( val === indéfini ) {
			val = curCSS( élément, nom, styles );
		}

		// Convertit "normal" en valeur calculée
		if ( val === "normal" && nom dans cssNormalTransform ) {
			val = cssNormalTransform[ nom ] ;
		}

		// Rendre numérique si forcé ou si un qualificatif a été fourni et val semble numérique
		si ( extra === "" || extra ) {
			num = parseFloat( val );
			retour supplémentaire === vrai || estFinite( num ) ? nombre || 0 : val;
		}

		valeur de retour ;
	}
} );

jQuery.each( [ "hauteur", "largeur" ​​], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		obtenir : fonction (élém, calculé, supplémentaire) {
			si ( calculé ) {

				// Certains éléments peuvent avoir des informations de dimension si nous les montrons de manière invisible
				// mais il doit avoir un style d'affichage courant qui bénéficierait
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Prise en charge : Safari 8+
					// Les colonnes de table dans Safari ont un offsetWidth non nul & zéro
					// getBoundingClientRect().width sauf si l'affichage est modifié.
					// Prise en charge : IE <=11 uniquement
					// Exécution de getBoundingClientRect sur un nœud déconnecté
					// dans IE génère une erreur.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, fonction() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( élément, dimension, extra );
			}
		},

		set : function( élément, valeur, extra ) {
			correspondances var,
				styles = getStyles( élém ),

				// Ne lit styles.position que si le test a une chance d'échouer
				// pour éviter de forcer un reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolu",

				// Pour éviter de forcer un reflow, ne récupérez boxSizing que si nous en avons besoin (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || supplémentaire,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				soustraire = extra ?
					boxModelAdjustment(
						élément,
						dimension,
						supplémentaire,
						estBorderBox,
						modes
					) :
					0 ;

			// Tenez compte des dimensions non fiables de la bordure en comparant le décalage * au calcul et
			// simuler une boîte de contenu pour obtenir une bordure et un rembourrage (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				soustraire -= Math. plafond(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0,5
				);
			}

			// Convertir en pixels si un ajustement de valeur est nécessaire
			if ( soustraire && ( matches = rcssNum.exec( value ) ) &&
				( correspond à[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = valeur ;
				valeur = jQuery.css( élément, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	} ;
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	fonction (élément, calculé) {
		si ( calculé ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft : 0 }, function() {
						return elem.getBoundingClientRect().left ;
					} )
			) + "px" ;
		}
	}
);

// Ces crochets sont utilisés par animate pour développer les propriétés
jQuery.each( {
	marge: "",
	rembourrage : "",
	largeur de la bordure"
}, fonction (préfixe, suffixe) {
	jQuery.cssHooks[ préfixe + suffixe ] = {
		développer : fonction (valeur) {
			var je = 0,
				développé = {},

				// Suppose un seul nombre si ce n'est pas une chaîne
				parts = typeof value === "string" ? valeur.split( " " ) : [ valeur ];

			pour ( ; je < 4; je++ ) {
				étendu[ préfixe + cssExpand[ i ] + suffixe ] =
					parties[ je ] || parties[ i - 2 ] || parties[ 0 ] ;
			}

			retour élargi ;
		}
	} ;

	if ( préfixe !== "marge" ) {
		jQuery.cssHooks[ préfixe + suffixe].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css : fonction (nom, valeur) {
		return access( this, function( elem, name, value ) {
			styles variés, longueur,
				carte = {},
				je = 0 ;

			if ( Array.isArray( nom ) ) {
				styles = getStyles( élém );
				len = nom.longueur ;

				pour (; je < longueur; je++ ) {
					map[ nom[ je ] ] = jQuery.css( elem, nom[ je ], faux, styles );
				}

				carte de retour ;
			}

			valeur de retour !== non défini ?
				jQuery.style( élément, nom, valeur ) :
				jQuery.css( élément, nom );
		}, nom, valeur, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween ;

Tween.prototype = {
	constructeur : Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = assouplissement || jQuery.easing._default ;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = fin ;
		this.unit = unité || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: fonction() {
		var hooks = Tween.propHooks[ this.prop ];

		retour crochets && crochets.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	exécuter : fonction (pourcentage) {
		var assoupli,
			crochets = Tween.propHooks[ this.prop ];

		si ( this.options.duration ) {
			this.pos = assoupli = jQuery.easing[ this.easing ](
				pourcentage, this.options.duration * pourcentage, 0, 1, this.options.duration
			);
		} autre {
			this.pos = assoupli = pourcentage ;
		}
		this.now = ( this.end - this.start ) * assoupli + this.start;

		si ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( crochets && crochets.set ) {
			hooks.set( this );
		} autre {
			Tween.propHooks._default.set( this );
		}
		retournez ceci;
	}
} ;

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_défaut: {
		obtenir : fonction (tween) {
			var résultat ;

			// Utilise directement une propriété sur l'élément lorsqu'il ne s'agit pas d'un élément DOM,
			// ou lorsqu'il n'existe aucune propriété de style correspondante.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passer une chaîne vide comme 3ème paramètre à .css sera automatiquement
			// tente un parseFloat et revient à une chaîne si l'analyse échoue.
			// Les valeurs simples telles que "10px" sont analysées en Float ;
			// les valeurs complexes telles que "rotate(1rad)" sont renvoyées telles quelles.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Les chaînes vides, null, undefined et "auto" sont converties en 0.
			renvoie !résultat || résultat === "auto" ? 0 : résultat ;
		},
		ensemble : fonction (tween) {

			// Utilisez le crochet d'étape pour la compatibilité arrière.
			// Utilisez cssHook si c'est là.
			// Utilisez .style si disponible et utilisez des propriétés simples si disponibles.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} sinon si ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} autre {
				tween.elem[ tween.prop ] = tween.maintenant ;
			}
		}
	}
} ;

// Prise en charge : IE <=9 uniquement
// Approche basée sur la panique pour régler les choses sur des nœuds déconnectés
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	ensemble : fonction (tween) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.maintenant ;
		}
	}
} ;

jQuery.easing = {
	linéaire : fonction( p ) {
		retourner p ;
	},
	balancement : fonction( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default : "swing"
} ;

jQuery.fx = Tween.prototype.init ;

// Rétrocompatibilité <1.8 point d'extension
jQuery.fx.step = {} ;




var
	fxNow, en cours,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

programme de fonction() {
	si ( en cours ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( horaire );
		} autre {
			window.setTimeout( planning, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Les animations créées de manière synchrone s'exécuteront de manière synchrone
function créerFxMaintenant() {
	window.setTimeout( fonction() {
		fxNow = indéfini ;
	} );
	return ( fxNow = Date.maintenant() );
}

// Générer des paramètres pour créer une animation standard
function genFx( type, includeWidth ) {
	var qui,
		je = 0,
		attrs = { hauteur : type } ;

	// Si nous incluons la largeur, la valeur du pas est 1 pour faire toutes les valeurs cssExpand,
	// sinon la valeur du pas est 2 pour sauter Gauche et Droite
	inclureLargeur = inclureLargeur ? dix;
	pour (; je < 4; je += 2 - includeWidth ) {
		qui = cssExpand[ je ] ;
		attrs[ "marge" + qui ] = attrs[ "padding" + qui ] = type ;
	}

	si (inclusLargeur) {
		attrs.opacity = attrs.width = type ;
	}

	attributs de retour ;
}

function createTween( valeur, prop, animation ) {
	interpolation var,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		indice = 0,
		longueur = collection.longueur ;
	for ( ; index < longueur; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// Nous en avons fini avec cette propriété
			interpolation de retour ;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "largeur" ​​dans les accessoires || "hauteur" dans les accessoires,
		anim = ceci,
		origine = {},
		style = elem.style,
		caché = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Les animations de saut de file d'attente détournent les crochets fx
	si ( ! opts.queue ) {
		crochets = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = fonction() {
				if ( !hooks.unqueued ) {
					vieuxfeu();
				}
			} ;
		}
		hooks.unqueued++;

		anim.toujours( fonction() {

			// Assurez-vous que le gestionnaire complet est appelé avant que cela ne se termine
			anim.toujours( fonction() {
				hooks.unqueued-- ;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Détecter les animations afficher/masquer
	pour ( prop dans props ) {
		valeur = props[ prop ] ;
		si ( rfxtypes. test ( valeur ) ) {
			supprimer les accessoires[prop] ;
			basculer = basculer || valeur === "basculer" ;
			if ( valeur === ( masqué ? "masquer" : "afficher" ) ) {

				// Faire semblant d'être caché s'il s'agit d'un "show" et
				// il y a encore des données d'un show/hide arrêté
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					caché = vrai ;

				// Ignorer toutes les autres données d'affichage/masquage sans opération
				} autre {
					Continuez;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out s'il s'agit d'un no-op comme .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		retourner;
	}

	// Restreindre les styles "débordement" et "affichage" lors des animations de boîte
	if ( isBox && elem.nodeType === 1 ) {

		// Prise en charge : IE <=9 - 11, Edge 12 - 15
		// Enregistrez les 3 attributs de débordement car IE ne déduit pas le raccourci
		// à partir de overflowX et overflowY de valeur identique et Edge ne fait que refléter
		// la valeur overflowX ici.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ] ;

		// Identifie un type d'affichage, en préférant les anciennes données afficher/masquer à la cascade CSS
		restoreDisplay = dataShow && dataShow.display;
		si (restoreDisplay == null) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "aucun" ) {
			si ( restaurerAfficher ) {
				afficher = restaurerAfficher ;
			} autre {

				// Récupère la ou les valeurs non vides en forçant temporairement la visibilité
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restaurerAffichage ;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animer les éléments en ligne en tant que bloc en ligne
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "aucun" ) {

				// Restaurer la valeur d'affichage d'origine à la fin des animations afficher/masquer pures
				si ( !propTween ) {
					anim.done( fonction() {
						style.display = restoreDisplay;
					} );
					si (restoreDisplay == null) {
						display = style.display;
						restoreDisplay = display === "aucun" ? "" : affichage;
					}
				}
				style.display = "bloc en ligne" ;
			}
		}
	}

	si ( opts.overflow ) {
		style.overflow = "caché" ;
		anim.toujours( fonction() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implémenter les animations afficher/masquer
	propTween = faux ;
	pour ( prop in orig ) {

		// Configuration générale d'affichage/masquage pour cette animation d'élément
		si ( !propTween ) {
			si (donnéesAfficher) {
				if ( "caché" dans dataShow ) {
					caché = dataShow.hidden ;
				}
			} autre {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Stocke caché/visible pour basculer donc `.stop().toggle()` "inverse"
			si (basculer) {
				dataShow.hidden = !caché;
			}

			// Afficher les éléments avant de les animer
			si (caché) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( fonction() {

				/* eslint-enable no-loop-func */

				// La dernière étape d'une animation "masquer" consiste en fait à masquer l'élément
				si ( !caché ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				pour ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Configuration par propriété
		propTween = createTween( caché ? dataShow[ prop ] : 0, prop, anim );
		si ( !( prop dans dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			si (caché) {
				propTween.end = propTween.début ;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	index var, nom, accélération, valeur, crochets ;

	// camelCase, specialEasing et expand cssHook pass
	pour (index dans les accessoires) {
		nom = camelCase( index );
		easing = specialEasing[ nom ] ;
		valeur = props[ index ] ;
		if ( Array.isArray( value ) ) {
			assouplissement = valeur[ 1 ] ;
			valeur = props[ index ] = valeur[ 0 ] ;
		}

		si ( index !== nom ) {
			props[ nom ] = valeur ;
			supprimer les accessoires[ index ] ;
		}

		crochets = jQuery.cssHooks[ nom ] ;
		if ( crochets && "développer" dans les crochets ) {
			valeur = hooks.expand( valeur );
			supprimer les accessoires [nom] ;

			// Pas tout à fait $.extend, cela n'écrasera pas les clés existantes.
			// Réutilisation de 'index' car nous avons le bon "nom"
			pour ( index dans la valeur ) {
				if ( !( index dans les props ) ) {
					props[ index ] = valeur[ index ] ;
					specialEasing[ index ] = accélération ;
				}
			}
		} autre {
			specialEasing[ nom ] = accélération ;
		}
	}
}

function Animation( elem, propriétés, options ) {
	résultat var,
		arrêté,
		indice = 0,
		length = Animation.prefilters.length,
		différé = jQuery.Deferred().always( fonction() {

			// Ne correspond pas à elem dans le sélecteur :animated
			supprimer tick.elem ;
		} ),
		tick = fonction() {
			si (arrêté) {
				retourner faux ;
			}
			var heure_actuelle = fxNow || createFxNow(),
				restant = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Prise en charge : Android 2.3 uniquement
				// Un bug de plantage archaïque ne nous permet pas d'utiliser `1 - ( 0.5 || 0 )` (#12497)
				temp = restant / animation.duration || 0,
				pourcentage = 1 - température,
				indice = 0,
				longueur = animation.tweens.longueur ;

			for ( ; index < longueur; index++ ) {
				animation.tweens[ index ].run( pourcentage );
			}

			différé.notifyWith( elem, [ animation, pourcentage, restant ] );

			// S'il y a plus à faire, céder
			si (pourcentage < 1 && longueur) {
				retour restant ;
			}

			// S'il s'agissait d'une animation vide, synthétise une notification de progression finale
			si ( !longueur ) {
				différé.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Résoudre l'animation et signaler sa conclusion
			différé.resolveWith( elem, [ animation ] );
			retourner faux ;
		},
		animation = différé.promesse( {
			élém : élém,
			accessoires : jQuery.extend({}, propriétés),
			opte : jQuery.extend( vrai, {
				specialEasing : {},
				accélération : jQuery.easing._default
			}, choix ),
			propriétés d'origine : propriétés,
			Options d'origine : options,
			startTime : fxNow || createFxNow(),
			durée : options.durée,
			préadolescents : [],
			createTween : fonction (prop, fin) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				interpolation de retour ;
			},
			stop: function( gotoEnd ) {
				indice var = 0,

					// Si nous allons jusqu'au bout, nous voulons exécuter tous les interpolations
					// sinon nous sautons cette partie
					longueur = gotoEnd ? animation.tweens.length : 0;
				si (arrêté) {
					retournez ceci;
				}
				arrêté = vrai ;
				for ( ; index < longueur; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Résout quand nous avons joué la dernière image ; sinon, rejeter
				si ( aller à la fin ) {
					différé.notifyWith( elem, [ animation, 1, 0 ] );
					différé.resolveWith( elem, [ animation, gotoEnd ] );
				} autre {
					différé.rejectWith( elem, [ animation, gotoEnd ] );
				}
				retournez ceci;
			}
		} ),
		props = animation.props;

	propFilter( accessoires, animation.opts.specialEasing );

	for ( ; index < longueur; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		si ( résultat ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			retourner le résultat ;
		}
	}

	jQuery.map( accessoires, createTween, animation );

	si ( estFonction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attache les callbacks des options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( cocher, {
			élém : élém,
			anim : animation,
			file d'attente : animation.opts.queue
		} )
	);

	animation de retour ;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners : {
		"*": [ fonction( prop, valeur ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			interpolation de retour ;
		} ]
	},

	tweener : fonction (accessoires, rappel) {
		si (estFonction(props)) {
			rappel = accessoires ;
			props = [ "*" ];
		} autre {
			props = props.match( rnothtmlwhite );
		}

		accessoire var,
			indice = 0,
			longueur = props.longueur ;

		for ( ; index < longueur; index++ ) {
			prop = accessoires[ index ] ;
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [] ;
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	préfiltres : [ defaultPrefilter ],

	préfiltre : function( callback, prepend ) {
		si (précéder) {
			Animation.prefilters.unshift( rappel );
		} autre {
			Animation.prefilters.push( rappel );
		}
	}
} );

jQuery.speed = fonction (vitesse, accélération, fn) {
	var opt = vitesse && type de vitesse === "objet" ? jQuery.extend( {}, vitesse ) : {
		complet : fn || !fn && accélération ||
			isFunction( vitesse ) && vitesse,
		durée : vitesse,
		assouplissement : fn && assouplissement || accélération && !isFunction( accélération ) && accélération
	} ;

	// Aller à l'état final si les fx sont désactivés
	si ( jQuery.fx.off ) {
		opt.duration = 0 ;

	} autre {
		if ( typeof opt.duration !== "nombre" ) ​​{
			if (opt.duration dans jQuery.fx.speeds) {
				opt.duration = jQuery.fx.speeds[ opt.duration] ;

			} autre {
				opt.duration = jQuery.fx.speeds._default ;
			}
		}
	}

	// Normaliser opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx" ;
	}

	// Mise en file d'attente
	opt.old = opt.complet ;

	opt.complete = fonction() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		si (opt.queue) {
			jQuery.dequeue( this, opt.queue );
		}
	} ;

	retour opt ;
} ;

jQuery.fn.extend( {
	fadeTo : function( speed, to, easing, callback ) {

		// Afficher tous les éléments masqués après avoir défini l'opacité sur 0
		renvoie this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animer à la valeur spécifiée
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var vide = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			faireAnimation = fonction() {

				// Opérer sur une copie de prop afin que l'assouplissement par propriété ne soit pas perdu
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Vider les animations ou terminer les résolutions immédiatement
				if ( vide || dataPriv.get( this, "finish" ) ) {
					anim.stop( vrai );
				}
			} ;

		faireAnimation.finish = faireAnimation;

		retour vide || optall.queue === faux ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = fonction (crochets) {
			var stop = hooks.stop;
			supprimer hooks.stop ;
			stop( gotoEnd );
		} ;

		si ( typede type !== "chaîne" ) {
			gotoEnd = clearQueue ;
			clearQueue = type;
			type = indéfini ;
		}
		si ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( fonction() {
			var retirer de la file d'attente = vrai,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			si (indice) {
				if ( données[ index ] && données[ index ].stop ) {
					stopQueue( données[ index ] );
				}
			} autre {
				pour ( index dans les données ) {
					if ( données[ index ] && données[ index ].stop && rrun.test( index ) ) {
						stopQueue( données[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					retirer de la file d'attente = faux ;
					timers.splice( index, 1 );
				}
			}

			// Démarre la suivante dans la file d'attente si la dernière étape n'a pas été forcée.
			// Les temporisateurs appelleront actuellement leurs rappels complets, ce qui
			// retirera de la file d'attente mais seulement s'ils étaient gotoEnd.
			if ( retirer de la file d'attente || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finition : fonction (type) {
		si ( tapez !== faux ) {
			type = type || "fx" ;
		}
		return this.each( fonction() {
			indice variable,
				data = dataPriv.get( this ),
				file d'attente = données[ type + "file d'attente" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				longueur = file d'attente ? queue.length : 0;

			// Activer le drapeau de finition sur les données privées
			data.finish = vrai;

			// Vide d'abord la file d'attente
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Recherchez les animations actives et terminez-les
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Recherchez toutes les animations dans l'ancienne file d'attente et terminez-les
			for ( index = 0; index < longueur; index++ ) {
				if ( file d'attente[ index ] && file d'attente[ index ].finir ) {
					queue[ index ].finish.call( this );
				}
			}

			// Désactiver le drapeau de finition
			supprimer data.finish ;
		} );
	}
} );

jQuery.each( [ "basculer", "afficher", "masquer" ], function( _i, nom ) {
	var cssFn = jQuery.fn[ nom ] ;
	jQuery.fn[ nom ] = fonction( vitesse, accélération, rappel ) {
		vitesse de retour == nulle || type de vitesse === "booléen" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	} ;
} );

// Génère des raccourcis pour les animations personnalisées
jQuery.each( {
	slideDown : genFx( "montrer" ),
	slideUp : genFx( "masquer" ),
	slideToggle : genFx( "basculer" ),
	fadeIn : { opacité : "show" },
	fadeOut : { opacité : "masquer" },
	fadeToggle : { opacité : "toggle" }
}, fonction (nom, accessoires) {
	jQuery.fn[ nom ] = fonction( vitesse, accélération, rappel ) {
		return this.animate( props, speed, easing, callback );
	} ;
} );

jQuery.timers = [] ;
jQuery.fx.tick = fonction() {
	minuterie var,
		je = 0,
		minuteries = jQuery.timers ;

	fxNow = Date.maintenant();

	for (; je < timers.length; je++ ) {
		minuterie = minuteries[ je ] ;

		// Exécutez le minuteur et supprimez-le en toute sécurité une fois terminé (permettant une suppression externe)
		if ( !timer() && timers[ je ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	si ( !timers.longueur ) {
		jQuery.fx.stop();
	}
	fxNow = indéfini ;
} ;

jQuery.fx.timer = fonction (minuterie) {
	jQuery.timers.push( minuteur );
	jQuery.fx.start();
} ;

jQuery.fx.interval = 13 ;
jQuery.fx.start = fonction() {
	si ( en cours ) {
		retourner;
	}

	en cours = vrai ;
	programme();
} ;

jQuery.fx.stop = fonction() {
	en cours = null ;
} ;

jQuery.fx.speeds = {
	lent : 600,
	rapide : 200,

	// Vitesse par défaut
	_par défaut : 400
} ;


// Basé sur le plugin de Clint Helfers, avec permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = fonction (heure, type) {
	temps = jQuery.fx ? jQuery.fx.speeds[ temps ] || temps temps;
	type = type || "fx" ;

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( suivant, heure );
		hooks.stop = fonction() {
			window.clearTimeout( timeout );
		} ;
	} );
} ;


( une fonction() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "case à cocher" ;

	// Prise en charge : Android <=4.3 uniquement
	// La valeur par défaut d'une case à cocher doit être "on"
	support.checkOn = input.value !== "" ;

	// Prise en charge : IE <=11 uniquement
	// Doit accéder à selectedIndex pour sélectionner les options par défaut
	support.optSelected=opt.selected ;

	// Prise en charge : IE <=11 uniquement
	// Une entrée perd sa valeur après être devenue une radio
	entrée = document.createElement( "entrée" );
	entrée.value = "t" ;
	input.type = "radio" ;
	support.radioValue = input.value === "t" ;
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle ;

jQuery.fn.extend( {
	attr : fonction (nom, valeur) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr : fonction (nom) {
		return this.each( fonction() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr : fonction (élément, nom, valeur) {
		var ret, crochets,
			nType = elem.nodeType ;

		// Ne pas obtenir/définir les attributs sur les nœuds de texte, de commentaire et d'attribut
		si ( nType === 3 || nType === 8 || nType === 2 ) {
			retourner;
		}

		// Se replier sur prop lorsque les attributs ne sont pas pris en charge
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, nom, valeur );
		}

		// Les crochets d'attribut sont déterminés par la version en minuscules
		// Saisir le hook nécessaire s'il en existe un
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			crochets = jQuery.attrHooks[ nom.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		si ( valeur !== indéfini ) {
			si ( valeur === null ) {
				jQuery.removeAttr( élément, nom );
				retourner;
			}

			si ( crochets && "set" dans crochets &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				retour ret;
			}

			elem.setAttribute( nom, valeur + "" );
			valeur de retour ;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			retour ret;
		}

		ret = jQuery.find.attr( élément, nom );

		// Les attributs inexistants renvoient null, nous normalisons à undefined
		retour ret == null ? indéfini : ret;
	},

	attrHooks : {
		taper: {
			set : fonction (élément, valeur) {
				if ( !support.radioValue && valeur === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", valeur );
					si (val) {
						elem.value = val;
					}
					valeur de retour ;
				}
			}
		}
	},

	removeAttr : fonction (élément, valeur) {
		nom de la variable,
			je = 0,

			// Les noms d'attributs peuvent contenir des caractères d'espacement non HTML
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			tandis que ( ( nom = attrNames[ i++ ] ) ) {
				elem.removeAttribute( nom );
			}
		}
	}
} );

// Crochets pour les attributs booléens
boolHook = {
	set : fonction (élément, valeur, nom) {
		si ( valeur === faux ) {

			// Supprime les attributs booléens lorsqu'ils sont définis sur false
			jQuery.removeAttr( élément, nom );
		} autre {
			elem.setAttribute( nom, nom );
		}
		nom de retour ;
	}
} ;

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, nom ) {
	var getter = attrHandle[ nom ] || jQuery.find.attr ;

	attrHandle[ nom ] = fonction( élément, nom, estXML ) {
		var ret, poignée,
			nomminuscule = nom.toLowerCase();

		si ( !estXML ) {

			// Evite une boucle infinie en supprimant temporairement cette fonction du getter
			handle = attrHandle[ nomminuscule ] ;
			attrHandle[ nomminuscule ] = ret ;
			ret = getter( elem, nom, isXML ) != null ?
				nomminuscule :
				nul;
			attrHandle[ nomminuscule ] = poignée ;
		}
		retour ret;
	} ;
} );




var rfocusable = /^(?:input|select|zonetexte|bouton)$/i,
	rcliquable = /^(?:a|zone)$/i;

jQuery.fn.extend( {
	prop : fonction (nom, valeur) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp : fonction (nom) {
		return this.each( fonction() {
			supprimez ceci[ jQuery.propFix[ nom ] || Nom ];
		} );
	}
} );

jQuery.extend( {
	prop : fonction (élément, nom, valeur) {
		var ret, crochets,
			nType = elem.nodeType ;

		// Ne pas obtenir/définir les propriétés sur les nœuds de texte, de commentaire et d'attribut
		si ( nType === 3 || nType === 8 || nType === 2 ) {
			retourner;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fixe le nom et attache des crochets
			nom = jQuery.propFix[ nom ] || Nom;
			crochets = jQuery.propHooks[ nom ] ;
		}

		si ( valeur !== indéfini ) {
			si ( crochets && "set" dans crochets &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				retour ret;
			}

			return ( elem[ nom ] = valeur );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			retour ret;
		}

		retourner élément[ nom ] ;
	},

	propHooks : {
		tabIndex : {
			obtenir : fonction (élément) {

				// Prise en charge : IE <=9 - 11 uniquement
				// elem.tabIndex ne retourne pas toujours le
				// corrige la valeur lorsqu'elle n'a pas été définie explicitement
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Utiliser la récupération d'attribut appropriée (#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				si ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				si (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					renvoie 0 ;
				}

				retour -1 ;
			}
		}
	},

	propFix : {
		"pour": "htmlPour",
		"classe": "NomClasse"
	}
} );

// Prise en charge : IE <=11 uniquement
// Accéder à la propriété selectedIndex
// force le navigateur à respecter le paramètre sélectionné
// sur l'option
// Le getter s'assure qu'une option par défaut est sélectionnée
// quand dans un optgroup
// la règle eslint "no-unused-expressions" est désactivée pour ce code
// puisqu'il considère ces adhésions noop
si ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		obtenir : fonction (élément) {

			/* eslint pas d'expressions non utilisées : "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex ;
			}
			renvoie nul ;
		},
		set : fonction (élément) {

			/* eslint pas d'expressions non utilisées : "off" */

			var parent = elem.parentNode;
			si (parent) {
				parent.selectedIndex ;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex ;
				}
			}
		}
	} ;
}

jQuery.each( [
	"tabIndex",
	"lecture seulement",
	"longueur maximale",
	"Espacement des cellules",
	"CellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"bordure de cadre",
	"contenu modifiable"
], une fonction() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Supprime et réduit les espaces blancs selon les spécifications HTML
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	fonction stripAndCollapse( valeur ) {
		var tokens = value.match( rnothtmlwhite ) || [] ;
		return jetons.join( " " );
	}


fonction getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "classe" ) || "" ;
}

function classesVersTableau( valeur ) {
	if ( Array.isArray( value ) ) {
		valeur de retour ;
	}
	si ( type de valeur === "chaîne" ) {
		valeur de retour. match( rnothtmlwhite ) || [] ;
	}
	retourner [];
}

jQuery.fn.extend( {
	addClass : fonction (valeur) {
		classes var, elem, cur, curValue, clazz, j, finalValue,
			je = 0 ;

		si (estFonction(valeur)) {
			return this.each( fonction( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesVersTableau( valeur );

		si ( classes.longueur ) {
			tandis que ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				si ( cur ) {
					j = 0 ;
					tandis que ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " " ;
						}
					}

					// Attribuer uniquement si différent pour éviter un rendu inutile.
					valeurfinale = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "classe", valeurfinale );
					}
				}
			}
		}

		retournez ceci;
	},

	removeClass : fonction (valeur) {
		classes var, elem, cur, curValue, clazz, j, finalValue,
			je = 0 ;

		si (estFonction(valeur)) {
			return this.each( fonction( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		si ( !arguments.longueur ) {
			return this.attr( "classe", "" );
		}

		classes = classesVersTableau( valeur );

		si ( classes.longueur ) {
			tandis que ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// Cette expression est là pour une meilleure compressibilité (voir addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				si ( cur ) {
					j = 0 ;
					tandis que ( ( clazz = classes[ j++ ] ) ) {

						// Supprimer *toutes* les instances
						tandis que ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Attribuer uniquement si différent pour éviter un rendu inutile.
					valeurfinale = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "classe", valeurfinale );
					}
				}
			}
		}

		retournez ceci;
	},

	toggleClass : fonction (valeur, étatVal) {
		var type = type de valeur,
			isValidValue = type === "chaîne" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			retour stateVal ? this.addClass( valeur ) : this.removeClass( valeur );
		}

		si (estFonction(valeur)) {
			return this.each( fonction( je ) {
				jQuery( this ).toggleClass(
					value.call( this, je, getClass( this ), stateVal ),
					étatVal
				);
			} );
		}

		return this.each( fonction() {
			var className, i, self, classNames ;

			si ( estValeurValide ) {

				// Basculer les noms de classe individuels
				je = 0 ;
				self = jQuery( this );
				classNames = classesToArray( value );

				tandis que ( ( className = classNames[ i++ ] ) ) {

					// Vérifie chaque nom de classe donné, liste séparée par des espaces
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} autre {
						self.addClass( className );
					}
				}

			// Bascule le nom entier de la classe
			} sinon si ( valeur === indéfini || type === "booléen" ) {
				className = getClass( this );
				si ( NomClasse ) {

					// Stocke className si défini
					dataPriv.set( this, "__className__", className );
				}

				// Si l'élément a un nom de classe ou si on nous passe `false`,
				// puis supprimez le nom de classe entier (s'il y en avait un, ce qui précède l'a enregistré).
				// Sinon, ramène tout ce qui a été précédemment sauvegardé (le cas échéant),
				// retour à la chaîne vide si rien n'a été stocké.
				si ( this.setAttribute ) {
					this.setAttribute( "classe",
						NomClasse || valeur === faux ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: fonction (sélecteur) {
		var nom_classe, elem,
			je = 0 ;

		NomClasse = " " + sélecteur + " " ;
		tandis que ( ( elem = this[ i++ ] ) ) {
			si ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				retourner vrai ;
			}
		}

		retourner faux ;
	}
} );




var retour = /\r/g;

jQuery.fn.extend( {
	val : fonction (valeur) {
		crochets var, ret, valueIsFunction,
			elem = this[ 0 ];

		si ( !arguments.longueur ) {
			si (élément) {
				crochets = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ] ;

				si ( crochets &&
					"obtenir" dans les crochets &&
					( ret = hooks.get( elem, "value" ) ) !== indéfini
				) {
					retour ret;
				}

				ret = elem.value ;

				// Gère les cas de chaînes les plus courants
				si ( typeof ret === "chaîne" ) {
					return ret.replace( rreturn, "" );
				}

				// Gère les cas où la valeur est null/undef ou nombre
				retour ret == null ? "" : ret;
			}

			retourner;
		}

		valeurEstFonction = estFonction( valeur );

		return this.each( fonction( je ) {
			var val;

			si ( this.nodeType !== 1 ) {
				retourner;
			}

			si ( valeurEstFonction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} autre {
				val = valeur ;
			}

			// Traite null/undefined comme "" ; convertir des nombres en chaîne
			si ( val == null ) {
				val = "" ;

			} sinon si ( typeof val === "nombre" ) ​​{
				valeur += "" ;

			} sinon si ( Array.isArray( val ) ) {
				val = jQuery.map( val, fonction( valeur ) {
					valeur de retour == null ? "" : valeur + "" ;
				} );
			}

			crochets = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// Si set renvoie undefined, revient au réglage normal
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks : {
		option : {
			obtenir : fonction (élément) {

				var val = jQuery.find.attr( elem, "value" );
				valeur de retour != null ?
					val :

					// Prise en charge : IE <=10 - 11 uniquement
					// option.text lance des exceptions (#14686, #14858)
					// Supprimer et réduire les espaces blancs
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		sélectionnez : {
			obtenir : fonction (élément) {
				var valeur, option, je,
					options = élém.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					valeurs = un ? nul : [],
					max = un ? index + 1 : options.length;

				si ( indice < 0 ) {
					je = max ;

				} autre {
					je = un ? indice : 0 ;
				}

				// Boucle sur toutes les options sélectionnées
				pour ( ; je < max; je++ ) {
					option = options[ je ] ;

					// Prise en charge : IE <=9 uniquement
					// IE8-9 ne met pas à jour la sélection après la réinitialisation du formulaire (#2551)
					if ( ( option.selected || je === index ) &&

							// Ne retourne pas les options qui sont désactivées ou dans un optgroup désactivé
							!option.désactivée &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Récupère la valeur spécifique de l'option
						valeur = jQuery(option).val();

						// Nous n'avons pas besoin d'un tableau pour une sélection
						Si un ) {
							valeur de retour ;
						}

						// Les multi-sélections renvoient un tableau
						valeurs.push( valeur );
					}
				}

				valeurs de retour ;
			},

			set : fonction (élément, valeur) {
				var optionSet, option,
					options = élém.options,
					valeurs = jQuery.makeArray( value ),
					i = options.longueur ;

				alors que je-- ) {
					option = options[ je ] ;

					/* eslint-disable no-cond-assign */

					si ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ​​) > -1
					) {
						optionSet = vrai ;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force les navigateurs à se comporter de manière cohérente lorsqu'une valeur non correspondante est définie
				si ( ! ensemble d'options ) {
					elem.selectedIndex = -1 ;
				}
				valeurs de retour ;
			}
		}
	}
} );

// Getter/Setter des radios et des cases à cocher
jQuery.each( [ "radio", "case à cocher" ], fonction() {
	jQuery.valHooks[ this ] = {
		set : fonction (élément, valeur) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	} ;
	si ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		} ;
	}
} );




// Renvoie jQuery pour l'inclusion d'attributs uniquement


support.focusin = "onfocusin" dans la fenêtre ;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = fonction(e) {
		e.stopPropagation();
	} ;

jQuery.extend( jQuery.event, {

	trigger : function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ élément || document ],
			type = hasOwn.call( événement, "type" ) ? event.type : événement,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Ne pas faire d'événements sur les nœuds de texte et de commentaire
		si ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			retourner;
		}

		// focus/blur se transforme en focus in/out ; assurez-vous que nous ne les renvoyons pas en ce moment
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			retourner;
		}

		si ( type.indexOf( "." ) > -1 ) {

			// Déclencheur avec espace de noms ; créer une expression régulière pour correspondre au type d'événement dans handle ()
			espaces de noms = type.split( "." );
			type = espaces de noms.shift();
			espaces de noms.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// L'appelant peut transmettre un objet jQuery.Event, un objet ou simplement une chaîne de type d'événement
		événement = événement[ jQuery.expando ] ?
			un événement :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask : & 1 pour les gestionnaires natifs ; & 2 pour jQuery (toujours vrai)
		event.isTrigger = onlyHandlers ? 2 : 3 ;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			nul;

		// Nettoyer l'événement au cas où il serait réutilisé
		event.result = non défini ;
		si ( !événement.cible ) {
			event.target = elem;
		}

		// Clone toutes les données entrantes et ajoute l'événement, créant la liste d'arguments du gestionnaire
		données = données == null ?
			[ un événement ] :
			jQuery.makeArray( données, [ événement ] );

		// Autoriser les événements spéciaux à s'afficher en dehors des lignes
		special = jQuery.event.special[ type ] || {} ;
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			retourner;
		}

		// Déterminer à l'avance le chemin de propagation des événements, conformément à la spécification des événements W3C (#9951)
		// Bulle jusqu'au document, puis à la fenêtre ; guettez pour un propriétaire globalDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || taper;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for (; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur ;
			}

			// N'ajoute une fenêtre que si nous sommes arrivés au document (par exemple, pas d'obj simple ou de DOM détaché)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers sur le chemin de l'événement
		je = 0 ;
		tandis que ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			dernierElement = cur;
			événement.type = je > 1 ?
				bubbleType :
				special.bindType || taper;

			// Gestionnaire jQuery
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			si ( poignée ) {
				handle.apply( cur, data );
			}

			// Gestionnaire natif
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				si ( événement. résultat === faux ) {
					event.preventDefault();
				}
			}
		}
		événement.type = type;

		// Si personne n'a empêché l'action par défaut, faites-le maintenant
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			si ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Appelle une méthode DOM native sur la cible avec le même nom que l'événement.
				// Ne pas faire d'actions par défaut sur la fenêtre, c'est là que se trouvent les variables globales (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Ne pas re-déclencher un événement onFOO lorsque nous appelons sa méthode FOO()
					tmp = elem[ ontype ] ;

					si (tmp) {
						elem[ ontype ] = null ;
					}

					// Empêcher le redéclenchement du même événement, puisque nous l'avons déjà mentionné ci-dessus
					jQuery.event.triggered = type ;

					si ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					élément[ type ]();

					si ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = non défini ;

					si (tmp) {
						elem[ ontype ] = tmp ;
					}
				}
			}
		}

		return event.result;
	},

	// Se greffer sur un événement donneur pour en simuler un autre
	// Utilisé uniquement pour les événements `focus(in | out)`
	simuler : fonction (type, élément, événement) {
		var e = jQuery.extend(
			nouveau jQuery.Event(),
			un événement,
			{
				type : type,
				est simulé : vrai
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	déclencheur : fonction (type, données) {
		return this.each( fonction() {
			jQuery.event.trigger( type, données, this );
		} );
	},
	triggerHandler : fonction (type, données) {
		var elem = this[ 0 ];
		si (élément) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Prise en charge : Firefox <=44
// Firefox n'a pas d'événements focus(in | out)
// Billet associé - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Prise en charge : Chrome <=48 - 49, Safari <=9.0 - 9.1
// les événements focus(in | out) se déclenchent après les événements focus & blur,
// qui est une violation de spécification - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Ticket associé - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
si ( !support.focusin ) {
	jQuery.each( { focus : "focusin", blur : "focusout" }, function( orig, fix ) {

		// Attache un seul gestionnaire de capture sur le document pendant que quelqu'un veut focusin/focusout
		var gestionnaire = fonction (événement) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		} ;

		jQuery.event.special[ fix ] = {
			configuration : fonction() {

				// Handle : nœuds normaux (via `this.ownerDocument`), fenêtre
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || ce.document || ce,
					attaches = dataPriv.access( doc, fix );

				si ( !attache ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			démontage : fonction() {
				var doc = this.ownerDocument || ce.document || ce,
					attaches = dataPriv.access( doc, fix ) - 1;

				si ( !attache ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} autre {
					dataPriv.access( doc, fix, attaches );
				}
			}
		} ;
	} );
}
var location = window.location;

var nonce = { guid : Date.maintenant() } ;

var requête = ( /\?/ );



// Analyse xml entre navigateurs
jQuery.parseXML = fonction (données) {
	var xml, parserErrorElem ;
	if ( !data || typeof data !== "string" ) {
		renvoie nul ;
	}

	// Prise en charge : IE 9 - 11 uniquement
	// IE jette sur parseFromString avec une entrée invalide.
	essayer {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} attraper ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "XML invalide : " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent ;
				} ).join( "\n" ) :
				Les données
		) );
	}
	renvoie xml ;
} ;


var
	rsupport = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:soumettre|bouton|image|réinitialiser|fichier)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	nom de la variable ;

	if ( Array.isArray( obj ) ) {

		// Sérialise l'élément du tableau.
		jQuery.each( obj, fonction( je, v ) {
			if ( traditionnel || rbracket.test( prefix ) ) {

				// Traite chaque élément du tableau comme un scalaire.
				ajouter( préfixe, v );

			} autre {

				// L'élément n'est pas scalaire (tableau ou objet), encode son index numérique.
				buildParams(
					préfixe + "[" + ( typeof v === "objet" && v != null ? i : "" ) + "]",
					v,
					traditionnel,
					ajouter
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Sérialise l'élément d'objet.
		pour ( nom dans obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} autre {

		// Sérialise l'élément scalaire.
		add( préfixe, obj );
	}
}

// Sérialise un tableau d'éléments de formulaire ou un ensemble d'éléments
// clé/valeurs dans une chaîne de requête
jQuery.param = fonction (un, traditionnel) {
	préfixe var,
		s = [],
		ajouter = fonction( clé, valeurOuFonction ) {

			// Si la valeur est une fonction, invoquez-la et utilisez sa valeur de retour
			var valeur = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valeurOuFonction ;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		} ;

	si ( une == null ) {
		retourner "";
	}

	// Si un tableau a été transmis, supposez qu'il s'agit d'un tableau d'éléments de formulaire.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Sérialise les éléments du formulaire
		jQuery.each( une, fonction() {
			add( this.name, this.value );
		} );

	} autre {

		// Si traditionnel, encode "l'ancienne" méthode (la méthode 1.3.2 ou antérieure
		// l'a fait), sinon encode les paramètres de manière récursive.
		pour (préfixe dans un) {
			buildParams( préfixe, a[ préfixe ], traditionnel, add );
		}
	}

	// Retourne la sérialisation résultante
	return s.join( "&" );
} ;

jQuery.fn.extend( {
	sérialiser : fonction() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray : fonction() {
		retourner this.map( fonction() {

			// Peut ajouter propHook pour "elements" pour filtrer ou ajouter des éléments de formulaire
			var elements = jQuery.prop( this, "elements" );
			éléments de retour ? jQuery.makeArray( elements ) : this;
		} ).filter( fonction() {
			var type = this.type;

			// Utilisez .is( ":disabled" ) pour que fieldset[disabled] fonctionne
			renvoie this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( fonction( _i, élém ) {
			var val = jQuery( this ).val();

			si ( val == null ) {
				renvoie nul ;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { nom : elem.nom, valeur : val.replace( rCRLF, "\r\n" ) } ;
				} );
			}

			return { nom : elem.nom, valeur : val.replace( rCRLF, "\r\n" ) } ;
		} ).avoir();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152 : détection du protocole local
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocole = /^\/\//,

	/* Préfiltres
	 * 1) Ils sont utiles pour introduire des types de données personnalisés (voir ajax/jsonp.js pour un exemple)
	 * 2) Ceux-ci sont appelés :
	 * - AVANT de demander un transport
	 * - APRÈS la sérialisation des paramètres (s.data est une chaîne si s.processData est vrai)
	 * 3) la clé est le type de données
	 * 4) le symbole fourre-tout "*" peut être utilisé
	 * 5) l'exécution commencera par transport dataType et PUIS continuera jusqu'à "*" si nécessaire
	 */
	préfiltres = {},

	/* Transporte les liaisons
	 * 1) la clé est le type de données
	 * 2) le symbole fourre-tout "*" peut être utilisé
	 * 3) la sélection commencera par transport dataType et PUIS ira à "*" si nécessaire
	 */
	transports = {},

	// Évite la séquence de caractères comment-prolog (#10098); doit apaiser les peluches et éviter la compression
	allTypes = "*/".concat( "*" ),

	// Balise d'ancrage pour analyser l'origine du document
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// "constructeur" de base pour jQuery.ajaxPrefilter et jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression est facultatif et vaut par défaut "*"
	fonction de retour( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression ;
			dataTypeExpression = "*" ;
		}

		var type de données,
			je = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [] ;

		si ( estFonction( fonction ) ) {

			// Pour chaque dataType dans dataTypeExpression
			tandis que ( ( dataType = dataTypes[ i++ ] ) ) {

				// Préfixe si demandé
				si ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*" ;
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Sinon ajouter
				} autre {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	} ;
}

// Fonction d'inspection de base pour les préfiltres et les transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspecté = {},
		rechercheTransport = ( structure === transports );

	fonction inspecter( dataType ) {
		var sélectionné ;
		inspecté[ dataType ] = true ;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspecter( dataTypeOrTransport );
				retourner faux ;
			} else if ( chercheTransport ) {
				retour !( sélectionné = dataTypeOrTransport );
			}
		} );
		retour sélectionné ;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspecté[ "*" ] && inspecté( "*" );
}

// Une extension spéciale pour les options ajax
// qui prend des options "plates" (ne pas être étendues en profondeur)
// Corrige #9887
function ajaxExtend( cible, src ) {
	clé var, profonde,
		flatOptions = jQuery.ajaxSettings.flatOptions || {} ;

	pour ( entrer src ) {
		if ( src[ clé ] !== indéfini ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	si (profond) {
		jQuery.extend( vrai, cible, profond );
	}

	cible de retour ;
}

/* Gère les réponses à une requête ajax :
 * - trouve le bon type de données (intermédiaire entre le type de contenu et le type de données attendu)
 * - renvoie la réponse correspondante
 */
function ajaxHandleResponses( s, jqXHR, réponses ) {

	var ct, type, finalDataType, firstDataType,
		contenu = s.contenu,
		dataTypes = s.dataTypes ;

	// Supprime le type de données automatique et récupère le type de contenu dans le processus
	tandis que ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		si ( ct === indéfini ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Vérifie si nous avons affaire à un type de contenu connu
	si ( ct ) {
		for (tapez le contenu) {
			if ( contenu[ type ] && contenu[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				Pause;
			}
		}
	}

	// Vérifie si nous avons une réponse pour le dataType attendu
	si ( dataTypes[ 0 ] dans les réponses ) {
		finalDataType = dataTypes[ 0 ];
	} autre {

		// Essayez les types de données convertibles
		pour (taper les réponses) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				type de données final = type ;
				Pause;
			}
			si ( !firstDataType ) {
				firstDataType = type ;
			}
		}

		// Ou utilisez simplement le premier
		finalDataType = finalDataType || firstDataType ;
	}

	// Si nous avons trouvé un dataType
	// Nous ajoutons le dataType à la liste si nécessaire
	// et renvoie la réponse correspondante
	si (typeDonnéesfinal) {
		si ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		retourner les réponses[ finalDataType ] ;
	}
}

/* Conversions en chaîne compte tenu de la requête et de la réponse d'origine
 * Définit également les champs responseXXX sur l'instance jqXHR
 */
function ajaxConvert( s, réponse, jqXHR, isSuccess ) {
	var conv2, courant, conv, tmp, prev,
		convertisseurs = {},

		// Travailler avec une copie de dataTypes au cas où nous aurions besoin de le modifier pour la conversion
		dataTypes = s.dataTypes.slice();

	// Crée une carte de convertisseurs avec des clés minuscules
	si ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			convertisseurs[ conv.toLowerCase() ] = s.converters[ conv ] ;
		}
	}

	courant = dataTypes.shift();

	// Convertir en chaque dataType séquentiel
	tandis que ( courant ) {

		if ( s.responseFields[ courant ] ) {
			jqXHR[ s.responseFields[ courant ] ] = réponse ;
		}

		// Applique le filtre de données s'il est fourni
		if ( !prev && isSuccess && s.dataFilter ) {
			réponse = s.dataFilter( réponse, s.dataType );
		}

		précédent = courant ;
		courant = dataTypes.shift();

		si (actuel) {

			// Il n'y a de travail à faire que si le type de données actuel n'est pas automatique
			si ( courant === "*" ) {

				actuel = précédent ;

			// Convertit la réponse si le type de données précédent n'est pas automatique et diffère du courant
			} sinon si ( préc !== "*" && préc !== courant ) {

				// Rechercher un convertisseur direct
				conv = convertisseurs[ préc + " " + courant ] || convertisseurs[ "* " + courant ] ;

				// Si aucun n'est trouvé, recherche une paire
				si ( !conv ) {
					pour ( conv2 dans les convertisseurs ) {

						// Si conv2 sort le courant
						tmp = conv2.split( " " );
						si ( tmp[ 1 ] === courant ) {

							// Si prev peut être converti en entrée acceptée
							conv = convertisseurs[ prev + " " + tmp[ 0 ] ] ||
								convertisseurs[ "* " + tmp[ 0 ] ] ;
							si (conv) {

								// Condenser les convertisseurs d'équivalence
								si (conv === vrai) {
									conv = convertisseurs[ conv2 ] ;

								// Sinon, insère le dataType intermédiaire
								} sinon si ( convertisseurs[ conv2 ] !== vrai ) {
									courant = tmp[ 0 ] ;
									dataTypes.unshift( tmp[ 1 ] );
								}
								Pause;
							}
						}
					}
				}

				// Appliquer le convertisseur (si pas une équivalence)
				si ( conv !== vrai ) {

					// À moins que les erreurs ne soient autorisées à faire des bulles, les attraper et les renvoyer
					if ( conv && s.throws ) {
						réponse = conv( réponse );
					} autre {
						essayer {
							réponse = conv( réponse );
						} attraper ( e ) {
							retourner {
								état : "erreur d'analyse",
								erreur : conversion ? e : "Pas de conversion de " + prev + " vers " + current
							} ;
						}
					}
				}
			}
		}
	}

	return { état : "succès", données : réponse } ;
}

jQuery.extend( {

	// Compteur pour contenir le nombre de requêtes actives
	actif : 0,

	// Cache d'en-tête de dernière modification pour la prochaine requête
	dernière modification : {},
	etag : {},

	ajaxParamètres : {
		URL : location.href,
		tapez : "OBTENIR",
		isLocal : rlocalProtocol.test( location.protocol ),
		global : vrai,
		processData : vrai,
		asynchrone : vrai,
		contentType : "application/x-www-form-urlencoded ; charset=UTF-8",

		/*
		délai d'attente : 0,
		données : nulles,
		type de données : null,
		nom d'utilisateur : nul,
		mot de passe : nul,
		cache : nul,
		jette : faux,
		traditionnel : faux,
		en-têtes : {},
		*/

		accepte : {
			"*": tous les types,
			texte : "texte/brut",
			html : "texte/html",
			xml : "application/xml, texte/xml",
			json : "application/json, texte/javascript"
		},

		Contenu: {
			xml : /\bxml\b/,
			html : /\bhtml/,
			json : /\bjson\b/
		},

		champs de réponse : {
			xml : "réponseXML",
			texte : "réponseTexte",
			json : "réponseJSON"
		},

		// Convertisseurs de données
		// Les clés séparent les types source (ou catchall "*") et destination avec un seul espace
		convertisseurs : {

			// Convertit n'importe quoi en texte
			"* texte": chaîne,

			// Texte en html (true = pas de transformation)
			"texte html": vrai,

			// Évalue le texte comme une expression json
			"texte json": JSON.parse,

			// Analyse le texte en xml
			"texte xml": jQuery.parseXML
		},

		// Pour les options qui ne doivent pas être étendues en profondeur :
		// vous pouvez ajouter vos propres options personnalisées ici si
		// et quand vous en créez un qui ne devrait pas être
		// extension profonde (voir ajaxExtend)
		options à plat : {
			URL : vrai,
			contexte : vrai
		}
	},

	// Crée un objet de paramètres à part entière dans la cible
	// avec les champs ajaxSettings et settings.
	// Si la cible est omise, écrit dans ajaxSettings.
	ajaxSetup : fonction (cible, paramètres) {
		paramètres de retour?

			// Construction d'un objet de paramètres
			ajaxExtend( ajaxExtend( cible, jQuery.ajaxSettings ), paramètres ) :

			// Étendre ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, cible );
	},

	ajaxPrefilter : addToPrefiltersOrTransports( préfiltres ),
	ajaxTransport : addToPrefiltersOrTransports (transports),

	// Méthode principale
	ajax: fonction (URL, options) {

		// Si url est un objet, simule la signature pré-1.5
		if ( typeof url === "objet" ) {
			options = URL ;
			URL = non défini ;
		}

		// Force les options à être un objet
		options = options || {} ;

		transports varois,

			// URL sans paramètre anti-cache
			cacheURL,

			// En-têtes de réponse
			responseHeadersString,
			En-têtes de réponse,

			// gestion du délai d'attente
			timeoutTimer,

			// var de nettoyage d'url
			urlancre,

			// État de la requête (devient faux à l'envoi et vrai à la fin)
			complété,

			// Pour savoir si les évènements globaux doivent être dispatchés
			fireGlobals,

			// Variable de boucle
			je,

			// partie non mise en cache de l'url
			non mis en cache,

			// Crée l'objet d'options final
			s = jQuery.ajaxSetup({}, options),

			// Contexte des rappels
			callbackContext = s.context || s,

			// Le contexte des événements globaux est callbackContext s'il s'agit d'un nœud DOM ou d'une collection jQuery
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.événement,

			// Différés
			différé = jQuery. Différé(),
			completeDeferred = jQuery.Callbacks( "une fois la mémoire" ),

			// Rappels dépendants du statut
			statusCode = s.statusCode || {},

			// En-têtes (ils sont envoyés tous en même temps)
			requestHeaders = {},
			requestHeadersNames = {},

			// Message d'abandon par défaut
			strAbort = "annulé",

			// Faux xhr
			jqXHR = {
				étatprêt : 0,

				// Construit la table de hachage des en-têtes si nécessaire
				getResponseHeader : fonction (clé) {
					correspondance var ;
					si (complété) {
						si ( !responseHeaders ) {
							en-têtes de réponse = {} ;
							tandis que ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ] ;
					}
					match retour == null ? null : match.join( ", " );
				},

				// Chaîne brute
				getAllResponseHeaders : fonction() {
					retour terminé ? responseHeadersString : null ;
				},

				// Met en cache l'en-tête
				setRequestHeader : fonction (nom, valeur) {
					si (complété == null) {
						nom = requestHeadersNames[ nom.toLowerCase() ] =
							requestHeadersNames[ nom.toLowerCase() ] || Nom;
						requestHeaders[ nom ] = valeur ;
					}
					retournez ceci;
				},

				// Remplace l'en-tête du type de contenu de la réponse
				overrideMimeType : fonction (type) {
					si (complété == null) {
						s.mimeType = type ;
					}
					retournez ceci;
				},

				// Rappels dépendants du statut
				statusCode : fonction (carte) {
					code var ;
					si (carte) {
						si (complété) {

							// Exécute les rappels appropriés
							jqXHR.always( carte[ jqXHR.status ] );
						} autre {

							// Ajout paresseux des nouveaux rappels de manière à préserver les anciens
							pour (code dans la carte) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ] ;
							}
						}
					}
					retournez ceci;
				},

				// Annuler la requête
				abandonner : fonction (texte d'état) {
					var texte final = texte d'état || strAbort ;
					si ( transport ) {
						transport.abort( texte final );
					}
					done( 0, texte final );
					retournez ceci;
				}
			} ;

		// Attacher les différés
		différée.promesse( jqXHR );

		// Ajouter un protocole s'il n'est pas fourni (les préfiltres peuvent s'y attendre)
		// Gestion des fausses url dans l'objet paramètres (#10093 : cohérence avec l'ancienne signature)
		// Nous utilisons également le paramètre url s'il est disponible
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Option de méthode d'alias à saisir selon le ticket #12004
		s.type = options.method || options.type || la méthode || s.type ;

		// Extraction de la liste des types de données
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ] ;

		// Une requête interdomaine est en ordre lorsque l'origine ne correspond pas à l'origine actuelle.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Prise en charge : IE <=8 - 11, Edge 12 - 15
			// IE lève une exception lors de l'accès à la propriété href si l'url est malformée,
			// par exemple http://example.com:80x/
			essayer {
				urlAnchor.href = s.url ;

				// Prise en charge : IE <=8 - 11 uniquement
				// La propriété host de l'ancre n'est pas correctement définie lorsque s.url est relatif
				urlAnchor.href = urlAnchor.href ;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host ;
			} attraper ( e ) {

				// S'il y a une erreur lors de l'analyse de l'URL, supposez qu'il s'agit de crossDomain,
				// il peut être rejeté par le transport s'il est invalide
				s.crossDomain = true ;
			}
		}

		// Convertit les données si ce n'est pas déjà une chaîne
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Appliquer les préfiltres
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// Si la requête a été abandonnée à l'intérieur d'un préfiltre, s'arrêter là
		si (complété) {
			retourner jqXHR ;
		}

		// Nous pouvons déclencher des événements globaux dès maintenant si on nous le demande
		// Ne déclenche pas d'événements si jQuery.event n'est pas défini dans un scénario d'utilisation d'AMD (#15118)
		fireGlobals = jQuery.event && s.global;

		// Surveillez un nouvel ensemble de requêtes
		si ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Majuscule le type
		s.type = s.type.toUpperCase();

		// Détermine si la requête a du contenu
		s.hasContent = !rnoContent.test( s.type );

		// Enregistrez l'URL au cas où nous jouerions avec le If-Modified-Since
		// et/ou l'en-tête If-None-Match plus tard
		// Supprimer le hachage pour simplifier la manipulation d'url
		cacheURL = s.url.replace( rhash, "" );

		// Plus d'options de gestion pour les requêtes sans contenu
		if ( !s.hasContent ) {

			// Se souvenir du hachage pour pouvoir le remettre
			uncached = s.url.slice( cacheURL.length );

			// Si les données sont disponibles et doivent être traitées, ajouter les données à l'url
			if ( s.data && ( s.processData || typeof s.data === "chaîne" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682 : supprimer les données afin qu'elles ne soient pas utilisées lors d'une éventuelle nouvelle tentative
				supprimer les données ;
			}

			// Ajout ou mise à jour des paramètres anti-cache si nécessaire
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					non mis en cache ;
			}

			// Mettre du hash et de l'anti-cache sur l'URL qui sera demandée (gh-1732)
			s.url = cacheURL + non mis en cache ;

		// Remplacez '%20' par '+' s'il s'agit d'un contenu de corps de formulaire encodé (gh-2658)
		} sinon si ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Définit l'en-tête If-Modified-Since et/ou If-None-Match, si en mode ifModified.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Définir l'en-tête correct, si les données sont envoyées
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Définit l'en-tête Accepts pour le serveur, en fonction du dataType
		jqXHR.setRequestHeader(
			"J'accepte",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepte[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepte[ "*" ]
		);

		// Vérifier l'option des en-têtes
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( je, s.headers[ je ] );
		}

		// Autoriser les en-têtes/types mime personnalisés et l'abandon anticipé
		si ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || terminé ) ) {

			// Abandon si ce n'est déjà fait et retour
			return jqXHR.abort();
		}

		// L'abandon n'est plus une annulation
		strAbort = "abandonner" ;

		// Installer les callbacks sur les différés
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Obtenir le transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// S'il n'y a pas de transport, nous abandonnons automatiquement
		si ( !transport ) {
			done( -1, "Pas de transport" );
		} autre {
			jqXHR.readyState = 1 ;

			// Envoie l'événement global
			si ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// Si la requête a été abandonnée dans ajaxSend, arrêtez-vous là
			si (complété) {
				retourner jqXHR ;
			}

			// Temps libre
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( fonction() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			essayer {
				terminé = faux ;
				transport.send( requestHeaders, done );
			} attraper ( e ) {

				// Relance les exceptions post-complétion
				si (complété) {
					jeter e;
				}

				// Propager les autres comme résultats
				fait( -1, e );
			}
		}

		// Rappel lorsque tout est terminé
		fonction terminée (statut, nativeStatusText, réponses, en-têtes) {
			var isSuccess, succès, erreur, réponse, modifié,
				statusText = nativeStatusText ;

			// Ignorer les invocations répétées
			si (complété) {
				retourner;
			}

			terminé = vrai ;

			// Efface le timeout s'il existe
			si (timeoutTimer) {
				window.clearTimeout( timeoutTimer );
			}

			// Transport de déréférencement pour la collecte anticipée des ordures
			// (peu importe combien de temps l'objet jqXHR sera utilisé)
			transport = indéfini ;

			// En-têtes de réponse du cache
			responseHeadersString = en-têtes || "" ;

			// Définir readyState
			jqXHR.readyState = état > 0 ? 4 : 0 ;

			// Déterminer si réussi
			isSuccess = statut >= 200 && statut < 300 || état === 304 ;

			// Obtenir les données de réponse
			si (réponses) {
				réponse = ajaxHandleResponses( s, jqXHR, réponses );
			}

			// Utiliser un convertisseur noop pour le script manquant mais pas si jsonp
			si ( !estSuccès &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convertir quoi qu'il arrive (ainsi les champs responseXXX sont toujours définis)
			réponse = ajaxConvert( s, réponse, jqXHR, isSuccess );

			// En cas de succès, gère le chaînage des types
			si ( est un succès ) {

				// Définit l'en-tête If-Modified-Since et/ou If-None-Match, si en mode ifModified.
				if ( s.ifModified ) {
					modifié = jqXHR.getResponseHeader( "Last-Modified" );
					si (modifié) {
						jQuery.lastModified[ cacheURL ] = modifié ;
					}
					modifié = jqXHR.getResponseHeader( "etag" );
					si (modifié) {
						jQuery.etag[ cacheURL ] = modifié ;
					}
				}

				// si pas de contenu
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "pas de contenu" ;

				// si non modifié
				} sinon si (statut === 304) {
					statusText = "non modifié" ;

				// Si nous avons des données, convertissons-les
				} autre {
					statusText = réponse.état ;
					succès = réponse.données ;
					erreur = réponse.erreur ;
					estSuccès = !error;
				}
			} autre {

				// Extraire l'erreur de statusText et normaliser pour les non-abandons
				erreur = statusText ;
				if ( statut || !textestatut ) {
					statusText = "erreur" ;
					si (état < 0) {
						état = 0 ;
					}
				}
			}

			// Définir les données pour le faux objet xhr
			jqXHR.status = statut ;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "" ;

			// Succès/Erreur
			si ( est un succès ) {
				différé.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} autre {
				différé.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Rappels dépendants du statut
			jqXHR.statusCode( statusCode );
			statusCode = indéfini ;

			si ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? succès : erreur ] );
			}

			// Compléter
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			si ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Gérer le compteur global AJAX
				si ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		retourner jqXHR ;
	},

	getJSON : fonction (URL, données, rappel) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript : fonction (URL, rappel) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Décaler les arguments si l'argument de données a été omis
		si (estFonction(données)) {
			type = type || rappeler;
			rappel = données ;
			données = indéfini ;
		}

		// L'url peut être un objet options (qui doit alors avoir .url)
		return jQuery.ajax( jQuery.extend( {
			URL : URL,
			type : méthode,
			type de données : type,
			données : données,
			succès : rappel
		}, jQuery.isPlainObject( url ) && url ) );
	} ;
} );

jQuery.ajaxPrefilter( fonction(s) {
	var je ;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "" ;
		}
	}
} );


jQuery._eval Url = function( url, options, doc ) {
	return jQuery.ajax( {
		URL : URL,

		// Rendre cela explicite, puisque l'utilisateur peut remplacer cela via ajaxSetup (#11264)
		tapez : "OBTENIR",
		Type de données : "script",
		cache : vrai,
		asynchrone : faux,
		global : faux,

		// N'évalue la réponse que si elle réussit (gh-4126)
		// dataFilter n'est pas invoqué pour les réponses d'échec, donc utilisez-le à la place
		// du convertisseur par défaut est kludgy mais ça marche.
		convertisseurs : {
			"script texte": fonction() {}
		},
		dataFilter : fonction (réponse) {
			jQuery.globalEval( réponse, options, doc );
		}
	} );
} ;


jQuery.fn.extend( {
	wrapAll : fonction (html) {
		enveloppement var ;

		si ( this[ 0 ] ) {
			si (estFonction(html)) {
				html = html.call( this[ 0 ] );
			}

			// Les éléments autour desquels envelopper la cible
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			si ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( fonction() {
				var elem = ceci ;

				tandis que ( elem.firstElementChild ) {
					elem = elem.firstElementChild ;
				}

				élément de retour ;
			} ).append( this );
		}

		retournez ceci;
	},

	wrapInner : fonction (html) {
		si (estFonction(html)) {
			return this.each( fonction( je ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( fonction() {
			var self = jQuery( this ),
				contenu = self.contenu();

			si (contenu.longueur) {
				content.wrapAll( html );

			} autre {
				self.append( html );
			}
		} );
	},

	envelopper : fonction (html) {
		var htmlEstFonction = estFonction( html );

		return this.each( fonction( je ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	dérouler : fonction (sélecteur) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		retournez ceci;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
} ;
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
} ;




jQuery.ajaxSettings.xhr = fonction() {
	essayer {
		renvoie une nouvelle fenêtre.XMLHttpRequest();
	} attraper ( e ) {}
} ;

var xhrSuccessStatus = {

		// Le protocole de fichier donne toujours le code d'état 0, supposons 200
		0 : 200,

		// Prise en charge : IE <=9 uniquement
		// #1450 : parfois IE renvoie 1223 alors qu'il devrait être 204
		1223 : 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported ;

jQuery.ajaxTransport( fonction( options ) {
	var rappel, erreurCallback ;

	// Interdomaine autorisé uniquement s'il est pris en charge via XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		retourner {
			envoyer : fonction (en-têtes, complet) {
				var je,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.nom d'utilisateur,
					options.password
				);

				// Appliquer les champs personnalisés si fournis
				si (options.xhrFields) {
					pour ( je dans options.xhrFields ) {
						xhr[ je ] = options.xhrFields[ je ] ;
					}
				}

				// Remplacer le type mime si nécessaire
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// En-tête X-Requested-With
				// Pour les requêtes inter-domaines, vu que les conditions d'un contrôle en amont sont
				// semblable à un puzzle, nous ne le définissons tout simplement jamais pour être sûr.
				// (il peut toujours être défini sur une base par demande ou même en utilisant ajaxSetup)
				// Pour les requêtes du même domaine, l'en-tête ne changera pas s'il est déjà fourni.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest" ;
				}

				// Définir les en-têtes
				pour ( je dans les en-têtes ) {
					xhr.setRequestHeader( je, en-têtes[ je ] );
				}

				// Rappeler
				rappel = fonction (type) {
					fonction de retour() {
						si (rappel) {
							rappel = erreurCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null ;

							si ( tapez === "abandonner" ) {
								xhr.abort();
							} sinon si (type === "erreur" ) {

								// Prise en charge : IE <=9 uniquement
								// Lors d'un abandon natif manuel, IE9 lance
								// erreurs sur tout accès à la propriété qui n'est pas readyState
								if ( typeof xhr.status !== "nombre" ) ​​{
									complete( 0, "erreur" );
								} autre {
									Achevée(

										// Fichier : le protocole renvoie toujours l'état 0 ; voir #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} autre {
								Achevée(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Prise en charge : IE <=9 uniquement
									// IE9 n'a pas de XHR2 mais lance le binaire (trac-11426)
									// Pour XHR2 non textuel, laissez l'appelant le gérer (gh-2498)
									( xhr.responseType || "texte" ) !== "texte" ||
									typeof xhr.responseText !== "chaîne" ?
										{ binaire : xhr.response } :
										{ texte : xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					} ;
				} ;

				// Écouter les événements
				xhr.onload = rappel();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Prise en charge : IE 9 uniquement
				// Utilisez onreadystatechange pour remplacer onabort
				// pour gérer les abandons non interceptés
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback ;
				} autre {
					xhr.onreadystatechange = fonction() {

						// Vérifie readyState avant le délai d'attente à mesure qu'il change
						si ( xhr.readyState === 4 ) {

							// Autoriser l'appel d'une erreur en premier,
							// mais cela ne gérera pas un abandon natif
							// Enregistre également errorCallback dans une variable
							// car xhr.onerror n'est pas accessible
							window.setTimeout( fonction() {
								si (rappel) {
									erreurCallback();
								}
							} );
						}
					} ;
				}

				// Crée le rappel d'abandon
				rappel = rappel( "abandonner" );

				essayer {

					// Envoyez la requête (cela peut déclencher une exception)
					xhr.send( options.hasContent && options.data || null );
				} attraper ( e ) {

					// #14683 : relancer uniquement si cela n'a pas encore été signalé comme une erreur
					si (rappel) {
						jeter e;
					}
				}
			},

			abandonner : fonction() {
				si (rappel) {
					rappeler();
				}
			}
		} ;
	}
} );




// Empêche l'exécution automatique des scripts lorsqu'aucun dataType explicite n'a été fourni (Voir gh-2432)
jQuery.ajaxPrefilter( fonction(s) {
	si ( s.crossDomain ) {
		s.contents.script = faux ;
	}
} );

// Installe le type de données du script
jQuery.ajaxSetup( {
	accepte : {
		script : "texte/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	Contenu: {
		script : /\b(?:java|ecma)script\b/
	},
	convertisseurs : {
		"texte script": fonction( texte ) {
			jQuery.globalEval( text );
			renvoyer le texte ;
		}
	}
} );

// Gérer le cas particulier du cache et crossDomain
jQuery.ajaxPrefilter( "script", fonction(s) {
	if ( s.cache === indéfini ) {
		s.cache = faux ;
	}
	si ( s.crossDomain ) {
		s.type = "GET" ;
	}
} );

// Lier le transport de hack de balise de script
jQuery.ajaxTransport( "script", fonction(s) {

	// Ce transport ne traite que les requêtes inter-domaines ou forcées par attrs
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, rappel ;
		retourner {
			envoyer : fonction( _, compléter ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "erreur de chargement", rappel = fonction( evt ) {
						script.remove();
						rappel = null ;
						si (evt) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Utilisez la manipulation native du DOM pour éviter notre supercherie domManip AJAX
				document.head.appendChild( script[ 0 ] );
			},
			abandonner : fonction() {
				si (rappel) {
					rappeler();
				}
			}
		} ;
	}
} );




var anciensCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Paramètres jsonp par défaut
jQuery.ajaxSetup( {
	jsonp : "rappel",
	jsonpCallback : fonction() {
		var rappel = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ rappel ] = vrai ;
		rappel de retour ;
	}
} );

// Détecte, normalise les options et installe les rappels pour les requêtes jsonp
jQuery.ajaxPrefilter( "json jsonp", fonction( s, paramètres d'origine, jqXHR ) {

	var callbackName, écrasé, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"URL" :
			typeof s.data === "chaîne" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Gérer si le type de données attendu est "jsonp" ou si nous avons un paramètre à définir
	si ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Récupère le nom du rappel, en se souvenant de la valeur préexistante qui lui est associée
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback ;

		// Insérer un rappel dans l'url ou les données du formulaire
		si ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} sinon si ( s.jsonp !== faux ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Utiliser le convertisseur de données pour récupérer json après l'exécution du script
		s.converters[ "script json" ] = fonction() {
			si ( !responseContainer ) {
				jQuery.error( callbackName + " n'a pas été appelé" );
			}
			return responseContainer[ 0 ] ;
		} ;

		// Forcer le type de données json
		s.dataTypes[ 0 ] = "json" ;

		// Installer le rappel
		écrasé = window[ callbackName ] ;
		fenêtre[ nom_rappel ] = fonction() {
			responseContainer = arguments ;
		} ;

		// Fonction de nettoyage (se déclenche après les convertisseurs)
		jqXHR.toujours( fonction() {

			// Si la valeur précédente n'existait pas - supprimez-la
			si (écrasé === indéfini) {
				jQuery( window ).removeProp( callbackName );

			// Sinon restaurer la valeur préexistante
			} autre {
				window[ callbackName ] = remplacé ;
			}

			// Enregistrer en tant que gratuit
			if ( s[ nom_rappel ] ) {

				// Assurez-vous que la réutilisation des options ne complique pas les choses
				s.jsonpCallback = originalSettings.jsonpCallback ;

				// Enregistrer le nom de rappel pour une utilisation future
				oldCallbacks.push( callbackName );
			}

			// Appel si c'était une fonction et nous avons une réponse
			if ( responseContainer && isFunction( écrasé ) ) {
				écrasé( responseContainer[ 0 ] );
			}

			responseContainer = écrasé = non défini ;
		} );

		// Déléguer au script
		retourne "script" ;
	}
} );




// Prise en charge : Safari 8 uniquement
// Dans les documents Safari 8 créés via document.implementation.createHTMLDocument
// réduire les formes sœurs : la seconde devient un enfant de la première.
// À cause de cela, cette mesure de sécurité doit être désactivée dans Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( fonction() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<formulaire></form><form></form>" ;
	return body.childNodes.length === 2;
} )();


// L'argument "data" doit être une chaîne de caractères html
// context (optionnel) : si spécifié, le fragment sera créé dans ce contexte,
// par défaut à document
// keepScripts (facultatif) : si vrai, inclura les scripts passés dans la chaîne html
jQuery.parseHTML = fonction (données, contexte, keepScripts) {
	si ( type de données !== "chaîne" ) {
		retourner [];
	}
	si ( type de contexte === "booléen" ) {
		keepScripts = contexte ;
		contexte = faux ;
	}

	var base, analysé, scripts ;

	si ( !contexte ) {

		// Empêche l'exécution immédiate des scripts ou des gestionnaires d'événements en ligne
		// en utilisant document.implementation
		si (support.createHTMLDocument) {
			contexte = document.implementation.createHTMLDocument( "" );

			// Définir le href de base pour le document créé
			// donc tous les éléments analysés avec des URL
			// sont basés sur l'URL du document (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} autre {
			contexte = document ;
		}
	}

	analysé = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Balise unique
	si (parsé) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	analysé = buildFragment( [ données ], contexte, scripts );

	si ( scripts && scripts.longueur ) {
		jQuery(scripts).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
} ;


/**
 * Charger une URL dans une page
 */
jQuery.fn.load = fonction (url, paramètres, rappel) {
	sélecteur var, type, réponse,
		soi = ceci,
		off = url.indexOf( " " );

	si ( désactivé > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url. slice( 0, off );
	}

	// Si c'est une fonction
	if ( isFunction( params ) ) {

		// Nous supposons que c'est le rappel
		rappel = paramètres ;
		paramètres = non défini ;

	// Sinon, construit une chaîne de paramètres
	} else if ( params && typeof params === "objet" ) {
		tapez = "POSTER" ;
	}

	// Si on a des éléments à modifier, faire la demande
	if ( self.length > 0 ) {
		jQuery.ajax( {
			URL : URL,

			// Si la variable "type" n'est pas définie, alors la méthode "GET" sera utilisée.
			// Rendre la valeur de ce champ explicite puisque
			// l'utilisateur peut le remplacer via la méthode ajaxSetup
			tapez : tapez || "AVOIR",
			Type de données : "html",
			données : paramètres
		} ).done( fonction( texte de réponse ) {

			// Enregistrer la réponse pour l'utiliser dans le rappel complet
			réponse = arguments ;

			self.html( sélecteur ?

				// Si un sélecteur a été spécifié, localise les bons éléments dans une div factice
				// Exclure les scripts pour éviter les erreurs IE 'Permission Denied'
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Sinon utiliser le résultat complet
				réponseText );

		// Si la requête aboutit, cette fonction obtient "data", "status", "jqXHR"
		// mais ils sont ignorés car la réponse a été définie ci-dessus.
		// Si elle échoue, cette fonction obtient "jqXHR", "status", "error"
		} ).always( rappel && fonction( jqXHR, status ) {
			self.each( fonction() {
				callback.apply( this, réponse || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	retournez ceci;
} ;




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).longueur;
} ;




jQuery.offset = {
	setOffset : fonction (élément, options, je) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			accessoires = {} ;

		// Définir la position en premier, dans le cas où le haut/gauche est défini même sur l'élément statique
		si ( position === "statique" ) {
			elem.style.position = "relatif" ;
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolue" || position === "fixe" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Nécessité de pouvoir calculer la position si l'un ou l'autre
		// haut ou gauche est automatique et la position est absolue ou fixe
		si ( calculPosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top ;
			curLeft = curPosition.gauche ;

		} autre {
			curTop = parseFloat( curCSSTop ) || 0 ;
			curLeft = parseFloat( curCSSLeft ) || 0 ;
		}

		si (estFonction(options)) {

			// Utilisez jQuery.extend ici pour permettre la modification de l'argument des coordonnées (gh-1848)
			options = options.call( elem, je, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop ;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ("using" dans les options) {
			options.using.call( elem, props );

		} autre {
			curElem.css( accessoires );
		}
	}
} ;

jQuery.fn.extend( {

	// offset() relie la bordure d'un élément à l'origine du document
	décalage : fonction (options) {

		// Conserver le chaînage pour le passeur
		si (arguments.longueur) {
			options de retour === indéfini ?
				ce :
				this.each( fonction( je ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, gagner,
			elem = this[ 0 ];

		si ( !elem ) {
			retourner;
		}

		// Renvoie des zéros pour les éléments déconnectés et masqués (affichage : aucun) (gh-2310)
		// Prise en charge : IE <=11 uniquement
		// Exécution de getBoundingClientRect sur un
		// nœud déconnecté dans IE génère une erreur
		if ( !elem.getClientRects().length ) {
			return { haut : 0, gauche : 0 } ;
		}

		// Obtenir la position relative au document en ajoutant le défilement de la fenêtre au gBCR relatif à la fenêtre
		rect = elem.getBoundingClientRect();
		gagner = elem.ownerDocument.defaultView ;
		retourner {
			haut : rect.top + win.pageYOffset,
			gauche : rect.left + win.pageXOffset
		} ;
	},

	// position() relie la boîte de marge d'un élément à la boîte de remplissage de son parent décalé
	// Ceci correspond au comportement du positionnement absolu CSS
	position : fonction() {
		si ( !ceci[ 0 ] ) {
			retourner;
		}

		var décalageParent, décalage, doc,
			elem = this[ 0 ],
			parentOffset = { haut : 0, gauche : 0 } ;

		// position : les éléments fixes sont décalés par rapport à la fenêtre, qui elle-même a toujours un décalage nul
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Supposons que position:fixed implique la disponibilité de getBoundingClientRect
			décalage = elem.getBoundingClientRect();

		} autre {
			offset = this.offset();

			// Compte pour le parent offset *réel*, qui peut être le document ou son élément racine
			// lorsqu'un élément positionné statiquement est identifié
			doc = elem.ownerDocument ;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( décalageParent, "position" ) === "statique" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporer des bordures dans son décalage, car elles sont en dehors de son origine de contenu
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Soustrait les décalages parents et les marges des éléments
		retourner {
			haut : offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			gauche : offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		} ;
	},

	// Cette méthode renverra documentElement dans les cas suivants :
	// 1) Pour l'élément à l'intérieur de l'iframe sans offsetParent, cette méthode renverra
	// élémentdocument de la fenêtre mère
	// 2) Pour l'élément caché ou détaché
	// 3) Pour le corps ou l'élément html, c'est-à-dire dans le cas du nœud html - il se retournera
	//
	// mais ces exceptions n'ont jamais été présentées comme des cas d'utilisation réels
	// et pourraient être considérés comme des résultats plus préférables.
	//
	// Cette logique, cependant, n'est pas garantie et peut changer à tout moment dans le futur
	décalageParent : fonction() {
		retourner this.map( fonction() {
			var offsetParent = this.offsetParent ;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent ;
			}

			retour offsetParent || documentElement ;
		} );
	}
} );

// Création des méthodes scrollLeft et scrollTop
jQuery.each( { scrollLeft : "pageXOffset", scrollTop : "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop ;

	jQuery.fn[ méthode ] = fonction( val ) {
		return access( this, function( elem, method, val ) {

			// Fusionner les documents et les fenêtres
			var gagner ;
			if ( isWindow( elem ) ) {
				gagner = élément ;
			} sinon si ( elem.nodeType === 9 ) {
				win = elem.defaultView ;
			}

			si ( val === indéfini ) {
				retour gagnant ? win[ prop ] : elem[ method ];
			}

			si (gagner) {
				win.scrollTo(
					!Haut ? val : win.pageXOffset,
					Haut ? val : win.pageYOffset
				);

			} autre {
				elem[ méthode ] = val;
			}
		}, méthode, val, arguments.length );
	} ;
} );

// Prise en charge : Safari <=7 - 9.1, Chrome <=37 - 49
// Ajouter les cssHooks haut/gauche en utilisant jQuery.fn.position
// Bogue Webkit : https://bugs.webkit.org/show_bug.cgi?id=29084
// Bug clignotant : https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle renvoie un pourcentage lorsqu'il est spécifié pour haut/gauche/bas/droite ;
// plutôt que de faire dépendre le module css du module offset, il suffit de le vérifier ici
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		fonction (élément, calculé) {
			si ( calculé ) {
				calculé = curCSS( elem, prop );

				// Si curCSS renvoie un pourcentage, se replie sur l'offset
				return rnumnonpx.test(calculé) ?
					jQuery( elem ).position()[ prop ] + "px" :
					calculé ;
			}
		}
	);
} );


// Crée les méthodes innerHeight, innerWidth, height, width, outerHeight et outerWidth
jQuery.each( { Hauteur : "hauteur", Largeur : "largeur" ​​}, function( nom, type ) {
	jQuery.each( {
		rembourrage : "inner" + nom,
		contenu : type,
		"": "extérieur" + nom
	}, function( defaultExtra, funcName ) {

		// La marge est uniquement pour outerHeight, outerWidth
		jQuery.fn[ funcName ] = fonction( marge, valeur ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( marge === vrai || valeur === vrai ? "marge" : "bordure" );

			return access( this, function( elem, type, value ) {
				var doc ;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h incluant les barres de défilement (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "intérieur" + nom ] :
						elem.document.documentElement[ "clients" + nom ] ;
				}

				// Récupère la largeur ou la hauteur du document
				si ( elem.nodeType === 9 ) {
					doc = elem.documentElement ;

					// Soit scroll[Width/Height] ou offset[Width/Height] ou clients[Width/Height],
					// celui qui est le plus grand
					return Math.max(
						elem.body[ "défilement" + nom ], doc[ "défilement" + nom ],
						elem.body[ "décalage" + nom ], doc[ "décalage" + nom ],
						doc[ "clients" + nom ]
					);
				}

				valeur de retour === indéfini ?

					// Récupère la largeur ou la hauteur de l'élément, en demandant mais sans forcer parseFloat
					jQuery.css( elem, type, extra ) :

					// Définit la largeur ou la hauteur de l'élément
					jQuery.style( élément, type, valeur, extra );
			}, type, enchaînable ? margin : undefined, chainable );
		} ;
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplet",
	"erreur ajax",
	"ajaxSuccès",
	"ajaxEnvoyer"
], fonction( _i, type ) {
	jQuery.fn[ type ] = fonction( fn ) {
		return this.on( type, fn );
	} ;
} );




jQuery.fn.extend( {

	lier : fonction (types, données, fn) {
		return this.on( types, null, data, fn );
	},
	dissocier : fonction (types, fn) {
		return this.off( types, null, fn );
	},

	délégué : fonction (sélecteur, types, données, fn) {
		return this.on( types, selector, data, fn );
	},
	non délégué : fonction (sélecteur, types, fn) {

		// ( namespace ) ou ( selector, types [, fn] )
		retourner arguments.longueur === 1 ?
			this.off( sélecteur, "**" ) :
			this.off( types, sélecteur || "**", fn );
	},

	survol : fonction( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );

jQuery.each(
	("flou focus focusin focusout redimensionner défilement cliquer dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave" +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	fonction( _i, nom ) {

		// Gérer la liaison d'événement
		jQuery.fn[ nom ] = fonction( données, fn ) {
			renvoie arguments.longueur > 0 ?
				this.on( nom, null, données, fn ) :
				this.trigger( nom );
		} ;
	}
);




// Prise en charge : Android <= 4.0 uniquement
// Assurez-vous que nous coupons BOM et NBSP
var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g ;

// Lie une fonction à un contexte, en appliquant éventuellement partiellement
// arguments.
// jQuery.proxy est obsolète pour promouvoir les normes (en particulier Function#bind)
// Cependant, il n'est pas prévu de le supprimer de si tôt
jQuery.proxy = fonction( fn, contexte ) {
	var tmp, arguments, proxy ;

	si ( type de contexte === "chaîne" ) {
		tmp = fn[ contexte ] ;
		contexte = fn ;
		fn = tmp ;
	}

	// Vérification rapide pour déterminer si la cible est appelable, dans la spécification
	// cela génère une TypeError, mais nous renverrons simplement undefined.
	si ( !estFonction( fn ) ) {
		retour indéfini ;
	}

	// Liaison simulée
	args = slice.call( arguments, 2 );
	proxy = fonction() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	} ;

	// Définissez le guid du gestionnaire unique sur le même gestionnaire d'origine, afin qu'il puisse être supprimé
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	procuration de retour ;
} ;

jQuery.holdReady = fonction (maintenir) {
	si (maintenir) {
		jQuery.readyWait++;
	} autre {
		jQuery.ready( vrai );
	}
} ;
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = estFonction ;
jQuery.isWindow = estWindow;
jQuery.camelCase = camelCase ;
jQuery.type = toType;

jQuery.maintenant = Date.maintenant;

jQuery.isNumeric = fonction( obj ) {

	// Depuis jQuery 3.0, isNumeric est limité à
	// chaînes et nombres (primitifs ou objets)
	// qui peut être converti en nombres finis (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "nombre" || type === "chaîne" ) &&

		// parseFloat NaNs numérique-cast faux positifs ("")
		// ... mais interprète mal les chaînes de nombres de tête, en particulier les littéraux hexadécimaux ("0x...")
		// la soustraction force les infinis à NaN
		!isNaN( obj - parseFloat( obj ) );
} ;

jQuery.trim = fonction (texte) {
	texte de retour == null ?
		"" :
		( texte + "" ).replace( rtrim, "" );
} ;



// Enregistrez-vous en tant que module AMD nommé, car jQuery peut être concaténé avec d'autres
// fichiers qui peuvent utiliser la définition, mais pas via un script de concaténation approprié qui
// comprend les modules AMD anonymes. Un AMD nommé est le plus sûr et le plus robuste
// façon de s'inscrire. Jquery en minuscules est utilisé car les noms de module AMD sont
// dérivé des noms de fichiers, et jQuery est normalement livré en minuscules
// nom de fichier. Faites-le après avoir créé le global afin que si un module AMD veut
// pour appeler noConflict pour masquer cette version de jQuery, cela fonctionnera.

// Notez que pour une portabilité maximale, les bibliothèques qui ne sont pas jQuery doivent
// se déclarent en tant que modules anonymes et évitent de définir un global si un
// Le chargeur AMD est présent. jQuery est un cas particulier. Pour plus d'informations, voir
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

si ( typeof définir === "fonction" && définir. amd ) {
	définir( "jquery", [], fonction() {
		retourner jQuery ;
	} );
}




var

	// Mapper sur jQuery en cas d'écrasement
	_jQuery = fenêtre.jQuery,

	// Mapper sur le $ en cas d'écrasement
	_$ = fenêtre.$;

jQuery.noConflict = fonction (profond) {
	si ( fenêtre.$ === jQuery ) {
		fenêtre.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery ;
	}

	retourner jQuery ;
} ;

// Expose les identifiants jQuery et $, même dans AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// et CommonJS pour les émulateurs de navigateur (#13566)
if ( typeof noGlobal === "undefined" ) {
	fenêtre.jQuery = fenêtre.$ = jQuery ;
}




retourner jQuery ;
} );