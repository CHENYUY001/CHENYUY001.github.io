### AI Systems Research

**The Hong Kong University of Science and Technology (Guangzhou)** · Sep 2025–present<br>
Supervised by Prof. [Jiayi Huang](https://jyhuang91.github.io/) and Prof. [Zhijiang Guo](https://cartus.github.io/).

- **KV cache reuse:** Implemented cache retention across policy weight synchronization in veRL and vLLM for asynchronous LLM reinforcement learning. On the Multi-News workload, this eliminated 26.7M redundant resume-prefill tokens and reduced training-window time by 5.7% on average.
- **Dynamic GPU allocation:** Developed runtime reallocation between trainer and rollout workers while preserving training state, and validated Qwen3-4B reallocation on Ascend NPUs. Reduced switching overhead, excluding request draining, from 295 s to 102 s.
- **Efficient inference:** Adapted DeepSeek-V4-Flash inference on vLLM-Ascend and analyzed cross-layer indexer similarity to assess reuse, with evaluation on 503 LongBench-v2 examples.

### Ascend Operator Development

**Huawei Ascend Community — Competition and Open-Source Contributions** · 2026–present

- **SquareSumV1:** Developed an Ascend C operator and won the Excellence Award at the Ascend Operator Challenge S9, University Research Track (Guangming Laboratory, Sep 2026).
- **CSYMV:** Implemented complex symmetric matrix–vector multiplication on Ascend 950PR using SIMT, warp cooperation, and tiled reductions; passed 1,004 functional and accuracy tests and community task acceptance.

### GPU Power Management

**Research Center of Computer Network and Information Security, Harbin Institute of Technology** · Jul 2024–Jun 2025<br>
Supervised by Prof. Meng Hao.

- Designed a GPU cluster power-allocation system using Triton Inference Server and NVML, with adaptive PID control to tune SM/memory clocks and inference batch size under power constraints.

### PIM Compiler Research

**Computer Systems and Platforms Laboratory, Seoul National University** · Dec 2023–Jun 2024<br>
Supervised by Prof. Bernhard Egger.

- Developed MLIR-based PIM compiler components and benchmarked them with DAMOV in a Samsung-funded project.
