uniform sampler2D uDepthTexture;

varying vec2 vUv;
varying vec3 vNormal;
varying float vDepth;

void main() {
    float uvX = 1.0 - uv.x;
    float uvY = 1.0 - uv.y;

    float depth = texture2D(uDepthTexture, vec2(1.0 - uvX, uvY)).r;

    vec3 newPosition = position;
    newPosition.y += depth;

    // Final position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Varying
    vUv = uv;
    vNormal = normal;
    vDepth = depth;
}