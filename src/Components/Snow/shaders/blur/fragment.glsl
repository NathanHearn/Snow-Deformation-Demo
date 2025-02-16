uniform sampler2D depthMap;
varying vec2 vUv;
    
void main() {
  float depth = texture2D(depthMap, vUv).r;
  gl_FragColor = vec4(depth, 0.0, 0.0, 1.0);
}