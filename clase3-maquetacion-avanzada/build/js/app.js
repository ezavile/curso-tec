//Envoltura -> para delimitar variables
$(function(){
	// $('#PokemonNombre') == document.getElementById('PokemonNombre')

	// Contenido de manera Literal
	//$('#PokemonNombre').text('<span>Pokemon 1</span>');

	// Contenido de manera codigo
	//$('#PokemonNombre').html('<span>Pokemon 1</span');

	// Agrega codigo enseguida
	//$('#PokemonNombre').append('<span>Pokemon 1</span');

	// Tipo Set mezclado con un Get
	//$('#PokemonNombre').html($('#PokemonNombre').attr('id'));

	// Acceder a las propiedades del css
	/*$('#PokemonNombre').css({
		"background-color":"red",
		"color": "white",
		"font-size": "3em"
	})*/

	// Funciones encadenadas
	/*var $nombrePokemon = $('#PokemonNombre');

	$nombrePokemon
		.html($nombrePokemon.attr('id'))
		.css({
			"background-color":"black",
			"color":"yellow"
		});*/

	var $pokemons = $('.Pokemons');

	function inicioPokemon(nombre){
		var template=[
			'<article class="Pokemon">',
				'<img class="Pokemon-img"/>',
				'<div class="Pokemon-info">',
					'<h2 class="Pokemon-info-nombre">'+nombre+'</h2>',
					'<p><span>Tipo</span>',
					'<ul>'].join('');

		return template;
	}

	function tipoPokemon(tipos){
		var allTipos = "";
		tipos.forEach(function(tipo){
			allTipos += '<li>'+tipo+'</li>';
		})
		allTipos += '</ul>';
		allTipos += '</p>';
		return allTipos;
	}
	
	function habilidadPokemon(habilidades){
		var allHabilidades = '<p><span>Habilidad</span>';
		allHabilidades += '<ul>';
		habilidades.forEach(function(habilidad){
			allHabilidades += '<li>'+habilidad+'</li>';
		})
		allHabilidades += '</ul>';
		allHabilidades += '</p>';
		return allHabilidades;
	}

	$.ajax({
		url: 'http://localhost:8080/api/pokemons.json',
		success: function(pokemons){
			var article = "";

			pokemons.forEach(function(pokemon){
				article += inicioPokemon(pokemon.name);
				article += tipoPokemon(pokemon.type);
				article += habilidadPokemon(pokemon.abilities);
				article += '</div>'
				article += '</article>';
				$pokemons.append(article);
			})
		}
	})


});