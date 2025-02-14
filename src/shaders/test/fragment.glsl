uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;

void main() {
    gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + uTime) + uColor, 1.0);
}