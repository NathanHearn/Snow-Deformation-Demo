uniform sampler2D uDepthTexture;
uniform float uResolution;
uniform float uSize;
uniform float uDepth;

varying float vDepth;

#include ../includes/simplexNoise2d.glsl

float sampleDepth(vec2 uv) {
    float depth = texture2D(uDepthTexture, uv).r;

    float noise1 = simplexNoise2d(uv * 4.0);
    noise1 = smoothstep(-0.8, 0.8, noise1) * 0.3;

    float noise2 = simplexNoise2d(uv * 10.0);
    noise2 = smoothstep(-1.0, 1.0, noise2) * 0.01;

    float noise = (noise1 + noise2) * 0.7;
    float noiseMultiplier = smoothstep(0.5, 1.0, depth);

    return depth * (1.0 * uDepth) - (noise * noiseMultiplier);
}

void main() {
    // Flip UVs
    vec2 flippedUv = vec2(uv.x, 1.0 - uv.y);

    // Test noice
    float noise = simplexNoise2d(flippedUv * 10.0);
    noise = smoothstep(0.0, 1.0, noise) * 0.1;

    // Get Depth of vertex
    float centerDepth = sampleDepth(flippedUv);
    // centerDepth += noise * 0.1;
    vec3 center = vec3(position.x, position.y + centerDepth, position.z);

    // Calculate texel sizes
    float texel = 1.0 / uResolution;
    float texelSize = uSize / uResolution;

    // Sample depth from surrounding pixels to recaulculate normal
    float rightDepth = sampleDepth(flippedUv + vec2(texel, 0.0));
    vec3 right = vec3(texelSize, rightDepth, 0.0) - center;
    float leftDepth = sampleDepth(flippedUv + vec2(-texel, 0.0));
    vec3 left = vec3(-texelSize, leftDepth, 0.0) - center;
    float topDepth = sampleDepth(flippedUv + vec2(0.0, -texel));
    vec3 top = vec3(0.0, topDepth, -texelSize) - center;
    float bottomDepth = sampleDepth(flippedUv + vec2(0.0, texel));
    vec3 bottom = vec3(0.0, bottomDepth, texelSize) - center;

    // Calculate normal
    vec3 topRight = cross(right, top);
    vec3 topLeft = cross(top, left);
    vec3 bottomLeft = cross(left, bottom);
    vec3 bottomRight = cross(bottom, right);
    csm_Normal = normalize(topRight + topLeft + bottomLeft + bottomRight);

    // Set position
    csm_Position = center;

    // Varyings
    vDepth = centerDepth;
}