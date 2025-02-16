
    uniform sampler2D uDepthTexture;
    uniform float uResolution;
    uniform float uBlurRadius;
    
    varying vec2 vUv;

void main() {
    float texel = 1.0 / uResolution;

    float weights[9] = float[](0.05, 0.09, 0.12, 0.15, 0.18, 0.15, 0.12, 0.09, 0.05);
      vec2 offsets[9] = vec2[](
        vec2(-1.0, -1.0), vec2(0.0, -1.0), vec2(1.0, -1.0),
        vec2(-1.0,  0.0), vec2(0.0,  0.0), vec2(1.0,  0.0),
        vec2(-1.0,  1.0), vec2(0.0,  1.0), vec2(1.0,  1.0)
      );

    vec4 sum = vec4(0.0);
    for (int i = 0; i < 9; i++) {
        vec2 uvOffset = vUv + offsets[i] * texel * uBlurRadius;
        sum += texture2D(uDepthTexture, uvOffset) * weights[i];
    }

    gl_FragColor = vec4(sum.r, 0.0, 0.0, 1.0);
}