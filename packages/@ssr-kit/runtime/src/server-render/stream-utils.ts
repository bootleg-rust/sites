import { Readable, PassThrough } from "stream";

type ReadableInput = Readable | NodeJS.ReadableStream;

export function joinStreams(...streams: ReadableInput[]): Readable {
  function pipeNext(): void {
    const nextStream = streams.shift();
    if (nextStream) {
      nextStream.pipe(out, { end: false });
      nextStream.on("end", function () {
        pipeNext();
      });
    } else {
      out.end();
    }
  }
  const out = new PassThrough();
  pipeNext();
  return out;
}
