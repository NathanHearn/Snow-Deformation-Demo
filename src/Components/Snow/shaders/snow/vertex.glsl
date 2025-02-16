uniform sampler2D uDepthTexture;
uniform float uResolution;
uniform float uSize;

varying float vDepth;

void main() {
    vec2 flippedUv = vec2(uv.x, 1.0 - uv.y);

    vec3 newPosition = position;

    float texel = 1.0 / uResolution;
    float texelSize = uSize / uResolution;

    float centerDepth = texture2D(uDepthTexture, flippedUv).r;
    vec3 center = vec3(position.x, position.y + centerDepth, position.z);

    float rightDepth = texture2D(uDepthTexture, flippedUv + vec2(texel, 0.0)).r;
    vec3 right = vec3(texelSize, rightDepth, 0.0) - center;
    float leftDepth = texture2D(uDepthTexture, flippedUv + vec2(-texel, 0.0)).r;
    vec3 left = vec3(-texelSize, leftDepth, 0.0) - center;
    float topDepth = texture2D(uDepthTexture, flippedUv + vec2(0.0, -texel)).r;
    vec3 top = vec3(0.0, topDepth, -texelSize) - center;
    float bottomDepth = texture2D(uDepthTexture, flippedUv + vec2(0.0, texel)).r;
    vec3 bottom = vec3(0.0, bottomDepth, texelSize) - center;

    vec3 topRight = cross(right, top);
    vec3 topLeft = cross(top, left);
    vec3 bottomLeft = cross(left, bottom);
    vec3 bottomRight = cross(bottom, right);

    csm_Normal = normalize(topRight + topLeft + bottomLeft + bottomRight);
    csm_Position = center;

    vDepth = centerDepth;
}