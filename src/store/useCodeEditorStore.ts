import { LANGUAGE_CONFIG } from "@/app/editor/_constants";
import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";
import { CodeEditorState } from "@/types";
// import { currentUser } from "@clerk/nextjs/server";



const getInitialState = () => {

    // If we are on the server, return default values
    if(typeof(window) === "undefined") {
        return {
            language: "javascript", 
            fontSize: 16,
            theme: "github-dark",
        }
    }

    // If we are on the client, return the values from local storage because local storage is a browser API
    const savedLanguage = localStorage.getItem("editor-language") || "javascript";
    const savedTheme = localStorage.getItem("editor-theme") || "github-dark";
    const savedFontSize = localStorage.getItem("editor-font-size") || 16;

    return {
        language: savedLanguage,
        theme: savedTheme,
        fontSize: Number(savedFontSize), 
    }
}

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
    const initialState = getInitialState();
    return {
        ...initialState,
        output: "",
        isRunning: false,
        error: null,
        editor: null,
        executionResult: null,
        runTimeMs: null,
        
        getCode: () => get().editor?.getValue() || "",


        setCode: (newCode: string) => {
            const editor = get().editor;
            const currentLanguage = get().language;

            if (editor) {
                editor.setValue(newCode);
                localStorage.setItem(`editor-code-${currentLanguage}`, newCode);
            }
        },
        

        setEditor: (editor: Monaco) => {
            const savedCode = localStorage.getItem(`editor-code-${get().language}`);
            if (savedCode) editor.setValue(savedCode);

            set({ editor });
        },

        setTheme: (theme: string) => {
            localStorage.setItem("editor-theme", theme);
            set({ theme });
        },

        setFontSize: (fontSize: number) => {
            localStorage.setItem("editor-font-size", fontSize.toString());
            set({ fontSize });
        },

        setLanguage: (language: string) => {
            // Save current language code before switching
            const currentCode = get().editor?.getValue();
            if(currentCode) {
                localStorage.setItem(`editor-code-${get().language}`, currentCode);
            }

            localStorage.setItem("editor-language", language);

            set({
                language,
                output: "",
                error: null,
            });
        },

        runCode: async (stdin) => {
            const { language, getCode } = get();
            const code = getCode();

            if(!code) {
                set({error: "Please write some code"});
                return;
            }

            set({isRunning: true, error: null, output: ""});

            try {
                // const inputElement = document.getElementById("stdin") as HTMLTextAreaElement | null;
                // const stdin = inputElement?.value;
                const runtime = LANGUAGE_CONFIG[language].pistonRuntime;
                const t0 = performance.now();
                const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        language: runtime.language,
                        version: runtime.version,
                        files: [{ content: code }],
                        stdin
                    }),
                });
                const t1 = performance.now();
                const runTimeMs = t1 - t0;

                const data = await response.json();
                console.log(`Data: ${data}`);

                // Handle API level errors
                if(data.message) {
                    set({error: data.message, executionResult: {code, output: "", error: data.message}});
                    return;
                }

                // Handle compilation errors
                if(data.compile && data.compile.code != 0) {
                    const error = data.compile.stderr || data.compile.output;
                    set({
                        error,
                        executionResult: {
                            code,
                            output: "",
                            error
                        }
                    });

                    return;
                } 

                // Handle runtime errors
                if(data.run && data.run.code != 0) {
                    const error = data.run.stderr || data.run.output;
                    set({
                        error,
                        executionResult: {
                            code,
                            output: "",
                            error
                        }
                    });

                    return;
                }

                // Execution successful
                const output = data.run.output;

                set({
                    output: output.trim(),
                    error: null,
                    runTimeMs: runTimeMs,
                    executionResult: {
                        code,
                        output: output.trim(),
                        error: null
                    }
                });

            } catch (error) {
                console.log(`Error running the code: ${error}`);
                set({
                    error: "Error running the code",
                    runTimeMs: null,
                    executionResult: {
                        code,
                        output: "",
                        error: "Error running the code"
                    } 
                });
            } finally {
                set({isRunning: false});
            }

        }
    }
});

export const getExecutionResult = () => useCodeEditorStore.getState().executionResult;