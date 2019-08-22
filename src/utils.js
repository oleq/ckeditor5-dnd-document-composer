export function uid() {
	return Array( 5 ).fill( 0 ).map( x => Math.random().toString( 36 ).charAt( 2 ) ).join( '' );
}
