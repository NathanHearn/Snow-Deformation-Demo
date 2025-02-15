uniform sampler2D uDepthTexture;
uniform vec2 uResolution;

varying vec2 vUv;
varying vec3 vNormal;
varying float vDepth;

void main() {
    vec2 flippedUv = vec2(uv.x, 1.0 - uv.y);

    vec3 newPosition = position;

    // Box blur
    // vec2 textureOffset = 1.0 / uResolution; // (one pixel)
    float textureShift = 0.003;
    float d1 = texture2D(uDepthTexture, flippedUv).r;
    float d2 = texture2D(uDepthTexture, flippedUv + vec2(-textureShift, 0)).r;
    float d3 = texture2D(uDepthTexture, flippedUv + vec2(textureShift, 0)).r;
    float d4 = texture2D(uDepthTexture, flippedUv + vec2(0, -textureShift)).r;
    float d5 = texture2D(uDepthTexture, flippedUv + vec2(0, textureShift)).r;

    float depth = (d1 + d2 + d3 + d4 + d5) / 5.0;
    newPosition.y += depth;

    // Final position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Varying
    vUv = flippedUv;
    vNormal = normal;
    vDepth = depth;
}