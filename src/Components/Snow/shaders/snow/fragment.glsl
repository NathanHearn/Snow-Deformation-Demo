varying float vDepth;

void main() {
    vec4 deepColor = vec4(0.4, 0.6, 0.8, 1.0);
    vec4 mixedColor = mix(csm_DiffuseColor, deepColor, 1.0 - vDepth);

    csm_DiffuseColor = mixedColor;
}