uniform sampler2D uDepthTexture;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vNormal;
varying float vDepth;

void main() {
    gl_FragColor = vec4(vec3(vDepth), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}