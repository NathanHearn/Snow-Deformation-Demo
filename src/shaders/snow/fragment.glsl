uniform sampler2D uDepthTexture;

varying vec2 vUv;
varying vec3 vNormal;
varying float vDepth;

void main() {
    float depth = texture2D(uDepthTexture, vUv).r;

    gl_FragColor = vec4(vDepth, vDepth, vDepth, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}